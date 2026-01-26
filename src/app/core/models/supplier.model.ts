export interface Supplier {
	id: string; // Guid
	name: string;
	address: string;
	email: string;
	phone: string;
	isActive?: boolean;
	createdAt?: string; // o Date, según tu API
	createdBy?: string;
	approvedBy?: string;
	approvedAt?: string;
	isApproved?: boolean;
	photo?: File;
}
