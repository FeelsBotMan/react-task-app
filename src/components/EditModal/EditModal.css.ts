import { style } from "@vanilla-extract/css";
import { vars } from "../../App.css";

export const wrapper = style({
    width: "100vw",
    height: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    zIndex: 10000,
});

export const modalWindow = style({
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    width: "800px",
    height: "max-content",
    overflowY: "auto",
    backgroundColor: vars.color.mainDarker,
    opacity: 0.95,
    borderRadius: 14,
    padding: 20,
    boxShadow: vars.shadow.basic,
    color: vars.color.brightText,
});

export const header = style({
    width: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: "40px",
})

export const closeButton = style({
    fontSize: vars.fontSizing.T2,
    cursor: "pointer",
    marginTop: "-20px",
    ":hover": {
        opacity: 0.8,
    },
})

export const title = style({
    fontSize: vars.fontSizing.T2,
    color: vars.color.brightText,
    marginRight: "auto",
    marginBottom: vars.spacing.medium,
})

export const buttons = style({
    display: "flex",
    justifyContent: "space-around",
    marginBottom: 50
})

export const updateButton = style({
    border: "none",
    borderRadius: 5,
    fontSize: vars.fontSizing.T4,
    padding: vars.spacing.big2,
    marginRight: vars.spacing.big1,
    backgroundColor: vars.color.updatedButton,
    cursor: "pointer",
    ":hover": {
        opacity: 0.8,
    }
})

export const deleteButton = style({
    border: "none",
    borderRadius: 5,
    fontSize: vars.fontSizing.T4,
    padding: vars.spacing.big2,
    marginRight: vars.spacing.big1,
    backgroundColor: vars.color.deleteButton,
    cursor: "pointer",
    ":hover": {
        opacity: 0.8,
    }
})

export const input = style({
    width: "100%",
    minHeight: "30px",
    border: "none",
    borderRadius: 5,
    marginBottom: vars.spacing.big2,
    padding: vars.spacing.medium,
    fontSize: vars.fontSizing.T4,
    boxShadow: vars.shadow.basic,
})

export const visuallyHidden = style({
    position: "absolute",
    width: "1px",
    height: "1px",
    margin: "-1px",
    overflow: "hidden",
    border: 0,
    padding: 0,
    clip: "rect(0 0 0 0)",
    clipPath: "inset(50%)",
    whiteSpace: "nowrap",
})