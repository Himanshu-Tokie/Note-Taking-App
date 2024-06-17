import { labelNotesDataType } from "../../Screens/Labels/types";

export type StaggedLabelProps = {
    data:labelNotesDataType
}

type itemType ={
    title: string;
    data: string;
    id: string;
    noteId: string;
    label: string;
    ImageUrl: string[];
}