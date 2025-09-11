import React from 'react';
import { useAvatar } from '../hooks/useAvatar';
import type { UseAvatarProps } from '../hooks/useAvatar';

// cSpell: disable
interface AvatarComponentProps {
  className?: string;
  style?: React.CSSProperties;
  onClick?: () => void;
  alt?: string;
}
// cSpell: enable

export default function Avatar1({
  userId,
  avatarUrl,
  size = 100,
  fallbackText,
  className = '',
  style = {},
  onClick,
  alt = 'ユーザーアバター'
}: AvatarComponentProps & UseAvatarProps) {
  const { publicUrl, isLoading, error, getFallbackInitials } = useAvatar({
    userId,
    avatarUrl,
    fallbackText
  });

  const baseStyle: React.CSSProperties = {
    width: size,
    height: size,
    borderRadius: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f0f0f0',
    color: '#666',
    fontSize: size * 0.4,
    fontWeight: 'bold',
    cursor: onClick ? 'pointer' : 'default',
    ...style
  };

  if (isLoading) {
    return (
      <div
        className={`avatar-loading ${className}`}
        style={{
          ...baseStyle,
          backgroundColor: '#e0e0e0',
        }}
        onClick={onClick}
      >
        <span style={{ fontSize: size * 0.3 }}>...</span>
      </div>
    );
  }

  if (error || !publicUrl) {
    return (
      <div
        className={`avatar-fallback ${className}`}
        style={baseStyle}
        onClick={onClick}
        title={error || 'No avatar'}
      >
        {getFallbackInitials(fallbackText)}
      </div>
    );
  }

  return (
    <img
      className={`avatar-image ${className}`}
      src={publicUrl}
      alt={alt}
      style={{
        ...baseStyle,
        objectFit: 'cover' as const,
      }}
      onClick={onClick}
      onError={() => {
        // 画像読み込み失敗時にエラー状態に遷移させるぷ
        // setStateを直接呼び出せないので、別の方法を考える必要があるぷ
        // このコンポーネントだけでは解決できない問題だぷ
      }}
    />
  );
};