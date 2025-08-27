import { theme } from '../styles/theme';

export const useTheme = () => {
  return {
    theme,
    colors: theme.colors,
    spacing: theme.spacing,
    borderRadius: theme.borderRadius,
    shadows: theme.shadows,
    typography: theme.typography,
    
    // Métodos utilitários
    getColor: (color: keyof typeof theme.colors, shade: keyof typeof theme.colors.primary = '500') => {
      return theme.colors[color][shade];
    },
    
    getSpacing: (size: keyof typeof theme.spacing) => {
      return theme.spacing[size];
    },
    
    getBorderRadius: (size: keyof typeof theme.borderRadius) => {
      return theme.borderRadius[size];
    },
    
    getShadow: (size: keyof typeof theme.shadows) => {
      return theme.shadows[size];
    },
    
    getFontSize: (size: keyof typeof theme.typography.fontSizes) => {
      return theme.typography.fontSizes[size];
    },
    
    getFontWeight: (weight: keyof typeof theme.typography.fontWeights) => {
      return theme.typography.fontWeights[weight];
    }
  };
};
