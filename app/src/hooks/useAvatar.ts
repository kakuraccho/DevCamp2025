import { useState, useEffect, useCallback } from 'react';
import { supabase } from '../supabaseClient';

// cSpell: disable
export interface UseAvatarProps {
  userId: string | null;
  avatarUrl?: string | null;
  size?: number;
  fallbackText?: string;
}

export interface AvatarState {
  publicUrl: string | null;
  isLoading: boolean;
  error: string | null;
}
// cSpell: enable

export const useAvatar = ({
  userId,
  avatarUrl,
  fallbackText
}: UseAvatarProps) => {
  const [state, setState] = useState<AvatarState>({
    publicUrl: null,
    isLoading: true,
    error: null
  });

  const generatePublicUrl = useCallback(async (filePath: string): Promise<string | null> => {
    try {
      const { data } = supabase.storage
        .from('avatars')
        .getPublicUrl(filePath);

      return data.publicUrl;
    } catch (error) {
      console.error('Public URL generation error:', error);
      return null;
    }
  }, []);

  const loadAvatarUrl = useCallback(async () => {
    if (!avatarUrl) {
      setState(prev => ({ ...prev, publicUrl: null, isLoading: false }));
      return;
    }

    setState(prev => ({ ...prev, isLoading: true, error: null }));

    try {
      const publicUrl = await generatePublicUrl(avatarUrl);

      if (publicUrl) {
        const response = await fetch(publicUrl, { method: 'HEAD' });
        if (response.ok) {
          setState({ publicUrl, isLoading: false, error: null });
        } else {
          throw new Error('Avatar image not found');
        }
      } else {
        throw new Error('Failed to generate public URL');
      }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      console.error('Avatar loading error:', errorMessage);
      setState({
        publicUrl: null,
        isLoading: false,
        error: errorMessage
      });
    }
  }, [avatarUrl, generatePublicUrl]);

  useEffect(() => {
    loadAvatarUrl();
  }, [loadAvatarUrl]);

  const removeAvatar = useCallback(async (): Promise<boolean> => {
    if (!userId || !avatarUrl) return false;

    try {
      const { error: storageError } = await supabase.storage
        .from('avatars')
        .remove([avatarUrl]);

      if (storageError) throw storageError;

      const { error: dbError } = await supabase
        .from('users')
        .update({ avatar_url: null })
        .eq('user_id', userId);

      if (dbError) throw dbError;

      setState({ publicUrl: null, isLoading: false, error: null });
      return true;
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to remove avatar';
      setState(prev => ({ ...prev, error: errorMessage }));
      return false;
    }
  }, [userId, avatarUrl]);

  const getFallbackInitials = useCallback((text?: string): string => {
    // fallbackTextが優先だぷ
    if (fallbackText) return fallbackText.slice(0, 2).toUpperCase();

    // textが提供されていなければ'?'を返すぷ
    if (!text) return '?';

    return text
      .split(' ')
      .map(word => word.charAt(0))
      .join('')
      .slice(0, 2)
      .toUpperCase();
  }, [fallbackText]);

  return {
    publicUrl: state.publicUrl,
    isLoading: state.isLoading,
    error: state.error,
    removeAvatar,
    refresh: loadAvatarUrl,
    getFallbackInitials
  };
};

export type UseAvatarReturn = ReturnType<typeof useAvatar>;