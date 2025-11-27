export type AppTheme = {
    name: string;
    background: string;
    card: string;
    text: string;
    textSecondary: string;
    primary: string;
    primaryDark: string;
    success: string;
    error: string;
    border: string;
};

export const lightTheme: AppTheme = {
    name: "light",
    background: "#F3F8F4",
    card: "#FFFFFF",
    text: "#1A2E22",
    textSecondary: "#5F7F6E",
    primary: "#4CAF50",
    success: "#16A34A",
    error: "#DC2626",
    primaryDark: "#3D8C41",
    border: "#DDE5DD",
};

export const darkTheme: AppTheme = {
    name: "dark",
    background: "#0F1A13",
    card: "#1B2A20",
    text: "#D8EDE0",
    textSecondary: "#8FB7A4",
    primary: "#6DDE76",
    primaryDark: "#52B55C",
    success: "#16A34A",
    error: "#DC2626",
    border: "#2E4236",
};

