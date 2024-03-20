import type { NodeProps, Position } from '@xyflow/svelte';

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

export type NodeText = NodeProps & {
	data: {
		text: string;
	};
};

export type NodeIcon = NodeProps & {
	data: {
		text: string;
		icon: string;
	};
};

export type NodeList = NodeProps & {
	data: {
		text: string;
		items: Array<ListItem>;
	};
};

export type NodeUnion = NodeList | NodeText | NodeIcon;
