import type { NodeProps, Position } from '@xyflow/svelte';
import type { EdgeProps } from '@xyflow/svelte';

/**
 *
 */
export type User = {
	email: string;
	password: string;
};

export type RegisterUser = {
	username: string;
	email: string;
	password: string;
	passwordConfirm: string;
};

export type ErrorRegisterUser = {
	username?: string;
	email?: string;
	password?: string;
	passwordConfirm?: string;
};

export type ErrorLoginUser = {
	email?: string;
	password?: string;
};

export type FormErrors = Record<string, string>;

export type ErrorDetails = {
	code: number;
	message: string;
	data: Record<string, { code: string; message: string }>;
};

/**
 * Nodes
 */
// TODO: Make single node to inherit from
export type NodeBase = {
	id: string;
	type: string;
	x: number;
	y: number;
	width: number;
	height: number;
	link: any;
};

export type ListItem = {
	id: string;
	text: string;
	checked: boolean;
};

type Color = {
	foreground: string;
	background: string;
	border: string;
};

type DataBase = {
	color: Color;
};

export type NodeText = NodeProps & {
	data: DataBase & {
		text: string;
	};
};

export type NodeTitle = NodeProps & {
	data: DataBase & {
		title: string;
		description: string;
		icon: string;
	};
};

export type NodeIcon = NodeProps & {
	data: Database & {
		text: string;
		icon: string;
	};
};

export type NodeList = NodeProps & {
	data: DataBase & {
		text: string;
		items: Array<ListItem>;
	};
};

export type NodeUnion = NodeList | NodeText | NodeIcon;

export type EdgeSmooth = EdgeProps & {
	data: {
		color: string;
	};
};

export type EdgeUnion = EdgeSmooth;

export type Pane = {
	w: number;
	h: number;
};

export type MapData = {
	nodes: any;
	edges: any;
	page: any;
};
