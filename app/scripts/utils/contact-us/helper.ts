import { data as ContactUsData } from './data';

export function getTopicsRoute(selectedIds: number[]) {
    const route: string[] = [];
    let currentLevel = ContactUsData;

    for (const id of selectedIds) {
        const node: any = currentLevel.find((item) => item.id === id);
        if (!node) break;
        route.push(node.topic || node.title);
        currentLevel = node.subtopics || [];
    }

    return route;
}