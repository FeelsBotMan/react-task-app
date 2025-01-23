import { style } from "@vanilla-extract/css";
import { vars } from "../../App.css";

export const listWrapper = style({
    display: "flex",
    flexDirection: "column",
    marginRight: vars.spacing.listSpacing,
    padding: vars.spacing.big2,
    minWidth: vars.minWidth.list,
    width: "max-content",
    height: "max-content",
    borderRadius: 10,
    backgroundColor: vars.color.list,
});

export const listName = style({
    fontSize: vars.fontSizing.T3,
    marginBottom: vars.spacing.big2,
});

export const listHeader = style({
    display: "flex",
    alignItems: "center",
});

export const deleteButton = style({
    padding: vars.spacing.small,
    borderRadius: 20,
    fontSize: vars.fontSizing.T2,
    marginLeft: "auto",
    marginTop: "-15px",
    marginRight: "5px",
    cursor: "pointer",
    ":hover": {
        backgroundColor: vars.color.task,
        boxShadow: vars.shadow.basic,
        opacity: 0.8,
    }
});

export const addTaskButton = style({
    backgroundColor: vars.color.mainFaded,
    display: "flex",
    alignItems: "center",
    height: "max-content",
    borderRadius: 4,
    marginTop: vars.spacing.small,
    fontSize: vars.fontSizing.T3,
    padding: vars.spacing.medium,
    cursor: "pointer",
    ":hover": {
        backgroundColor: vars.color.mainFadedBright
    }
});