export const palette = {
    tealGreen: "#128c7e",
    tealGreenDark: "#075e54",
    dark700: "#3b4045",
    lightGreen: "#5eba7d",
    green: "#25d366",
    lime: "#dcf8c6",
    skyblue: "#34b7f1",
    smokeWhite: "#ece5dd",
    white: "white",
    gray: "#3C3C3C",
    lightGray: "#757575",
    iconGray: "#717171",
    tomato: "#ff6347",
};

export type Theme = {
    colors: {
        background: string,
        foreground: string,
        primary: string,
        tertiary: string,
        secondary: string,
        white: string,
        text: string,
        secondaryText: string,
        iconGray: string,
        description: string,
        input: {
            inputText: string,
            inputBackground: string,
        }
    }
}


export const LightTheme: Theme = {
    colors: {
        background: palette.smokeWhite,
        foreground: palette.tealGreenDark,
        primary: palette.tealGreen,
        tertiary: palette.lime,
        secondary: palette.green,
        white: palette.white,
        text: palette.gray,
        secondaryText: palette.lightGray,
        iconGray: palette.iconGray,
        description: "#9f9f9f",
        input: {
            inputText: '#000',
            inputBackground: "#f0f0f0",
            // inputBackground: "#fff",
        }
    },
}
