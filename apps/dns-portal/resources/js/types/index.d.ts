export interface User {
    id: number;
    name: string;
    email: string;
    email_verified_at: string;
}

export type PageProps<T extends Record<string, unknown> = Record<string, unknown>> = T & {
    auth: {
        user: User;
    };
};

export interface DNSRecord {
    id: number;
    name: string;
    type: string;
    content: string;
    ttl: number;
    proxied: boolean;
    priority: number;
    created_on: string;
    modified_on: string;
}

export interface SiteRecord {
    id: number;
    name: string;
    uuid: string;
    path: string;
    domain: string;
    created_at: string;
    updated_at: string;
    dns_records: DNSRecord[];
}

