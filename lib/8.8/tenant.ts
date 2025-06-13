import { z } from 'zod';
import { API_VERSION, getQueryRequestBodySchema, getQueryResponseBodySchema, type Endpoint } from './common';
import { queryGroupsRequestBodySchema, queryGroupsResponseBodySchema, type Group } from './group';
import { queryRolesRequestBodySchema, queryRolesResponseBodySchema, type Role } from './role';
import {
	queryMappingRulesRequestBodySchema,
	queryMappingRulesResponseBodySchema,
	type MappingRule,
} from './mapping-rule';

const tenantSchema = z.object({
	tenantKey: z.string(),
	tenantId: z.string(),
	name: z.string(),
	description: z.string().optional(),
});
type Tenant = z.infer<typeof tenantSchema>;

const createTenantRequestBodySchema = tenantSchema.pick({
	tenantId: true,
	name: true,
	description: true,
});
type CreateTenantRequestBody = z.infer<typeof createTenantRequestBodySchema>;

const createTenantResponseBodySchema = tenantSchema;
type CreateTenantResponseBody = z.infer<typeof createTenantResponseBodySchema>;

const updateTenantRequestBodySchema = tenantSchema.pick({
	name: true,
	description: true,
});
type UpdateTenantRequestBody = z.infer<typeof updateTenantRequestBodySchema>;

const updateTenantResponseBodySchema = tenantSchema;
type UpdateTenantResponseBody = z.infer<typeof updateTenantResponseBodySchema>;

const queryTenantsRequestBodySchema = getQueryRequestBodySchema({
	sortFields: ['key', 'name', 'tenantId'] as const,
	filter: tenantSchema
		.pick({
			tenantId: true,
			name: true,
		})
		.partial(),
});
type QueryTenantsRequestBody = z.infer<typeof queryTenantsRequestBodySchema>;

const queryTenantsResponseBodySchema = getQueryResponseBodySchema(tenantSchema);
type QueryTenantsResponseBody = z.infer<typeof queryTenantsResponseBodySchema>;

const tenantUserSchema = z.object({
	username: z.string(),
});
type TenantUser = z.infer<typeof tenantUserSchema>;

const queryUsersByTenantRequestBodySchema = getQueryRequestBodySchema({
	sortFields: ['username'] as const,
	filter: z.never(),
});
type QueryUsersByTenantRequestBody = z.infer<typeof queryUsersByTenantRequestBodySchema>;

const queryUsersByTenantResponseBodySchema = getQueryResponseBodySchema(tenantUserSchema);
type QueryUsersByTenantResponseBody = z.infer<typeof queryUsersByTenantResponseBodySchema>;

const tenantClientSchema = z.object({
	clientId: z.string(),
});
type TenantClient = z.infer<typeof tenantClientSchema>;

const queryClientsByTenantRequestBodySchema = getQueryRequestBodySchema({
	sortFields: ['clientId'] as const,
	filter: z.never(),
});
type QueryClientsByTenantRequestBody = z.infer<typeof queryClientsByTenantRequestBodySchema>;

const queryClientsByTenantResponseBodySchema = getQueryResponseBodySchema(tenantClientSchema);
type QueryClientsByTenantResponseBody = z.infer<typeof queryClientsByTenantResponseBodySchema>;

const queryGroupsByTenantRequestBodySchema = queryGroupsRequestBodySchema;
type QueryGroupsByTenantRequestBody = z.infer<typeof queryGroupsByTenantRequestBodySchema>;

const queryGroupsByTenantResponseBodySchema = queryGroupsResponseBodySchema;
type QueryGroupsByTenantResponseBody = z.infer<typeof queryGroupsByTenantResponseBodySchema>;

const queryRolesByTenantRequestBodySchema = queryRolesRequestBodySchema;
type QueryRolesByTenantRequestBody = z.infer<typeof queryRolesByTenantRequestBodySchema>;

const queryRolesByTenantResponseBodySchema = queryRolesResponseBodySchema;
type QueryRolesByTenantResponseBody = z.infer<typeof queryRolesByTenantResponseBodySchema>;

const queryMappingRulesByTenantRequestBodySchema = queryMappingRulesRequestBodySchema;
type QueryMappingRulesByTenantRequestBody = z.infer<typeof queryMappingRulesByTenantRequestBodySchema>;

const queryMappingRulesByTenantResponseBodySchema = queryMappingRulesResponseBodySchema;
type QueryMappingRulesByTenantResponseBody = z.infer<typeof queryMappingRulesByTenantResponseBodySchema>;

const createTenant: Endpoint = {
	method: 'POST',
	getUrl() {
		return `/${API_VERSION}/tenants`;
	},
};

const getTenant: Endpoint<Pick<Tenant, 'tenantId'>> = {
	method: 'GET',
	getUrl(params) {
		const { tenantId } = params;

		return `/${API_VERSION}/tenants/${tenantId}`;
	},
};

const updateTenant: Endpoint<Pick<Tenant, 'tenantId'>> = {
	method: 'PUT',
	getUrl(params) {
		const { tenantId } = params;

		return `/${API_VERSION}/tenants/${tenantId}`;
	},
};

const deleteTenant: Endpoint<Pick<Tenant, 'tenantId'>> = {
	method: 'DELETE',
	getUrl(params) {
		const { tenantId } = params;

		return `/${API_VERSION}/tenants/${tenantId}`;
	},
};

const queryTenants: Endpoint = {
	method: 'POST',
	getUrl() {
		return `/${API_VERSION}/tenants/search`;
	},
};

const assignUserToTenant: Endpoint<Pick<Tenant, 'tenantId'> & { username: string }> = {
	method: 'PUT',
	getUrl(params) {
		const { tenantId, username } = params;

		return `/${API_VERSION}/tenants/${tenantId}/users/${username}`;
	},
};

const removeUserFromTenant: Endpoint<Pick<Tenant, 'tenantId'> & { username: string }> = {
	method: 'DELETE',
	getUrl(params) {
		const { tenantId, username } = params;

		return `/${API_VERSION}/tenants/${tenantId}/users/${username}`;
	},
};

const queryUsersByTenant: Endpoint<Pick<Tenant, 'tenantId'>> = {
	method: 'POST',
	getUrl(params) {
		const { tenantId } = params;

		return `/${API_VERSION}/tenants/${tenantId}/users/search`;
	},
};

const queryClientsByTenant: Endpoint<Pick<Tenant, 'tenantId'>> = {
	method: 'POST',
	getUrl(params) {
		const { tenantId } = params;

		return `/${API_VERSION}/tenants/${tenantId}/clients/search`;
	},
};

const queryGroupsByTenant: Endpoint<Pick<Tenant, 'tenantId'>> = {
	method: 'POST',
	getUrl(params) {
		const { tenantId } = params;

		return `/${API_VERSION}/tenants/${tenantId}/groups/search`;
	},
};

const queryRolesByTenant: Endpoint<Pick<Tenant, 'tenantId'>> = {
	method: 'POST',
	getUrl(params) {
		const { tenantId } = params;

		return `/${API_VERSION}/tenants/${tenantId}/roles/search`;
	},
};

const assignClientToTenant: Endpoint<Pick<Tenant, 'tenantId'> & { clientId: string }> = {
	method: 'PUT',
	getUrl(params) {
		const { tenantId, clientId } = params;

		return `/${API_VERSION}/tenants/${tenantId}/clients/${clientId}`;
	},
};

const removeClientFromTenant: Endpoint<Pick<Tenant, 'tenantId'> & { clientId: string }> = {
	method: 'DELETE',
	getUrl(params) {
		const { tenantId, clientId } = params;

		return `/${API_VERSION}/tenants/${tenantId}/clients/${clientId}`;
	},
};

const assignMappingRuleToTenant: Endpoint<Pick<Tenant, 'tenantId'> & Pick<MappingRule, 'mappingId'>> = {
	method: 'PUT',
	getUrl(params) {
		const { tenantId, mappingId } = params;

		return `/${API_VERSION}/tenants/${tenantId}/mappings/${mappingId}`;
	},
};

const removeMappingRuleFromTenant: Endpoint<Pick<Tenant, 'tenantId'> & Pick<MappingRule, 'mappingId'>> = {
	method: 'DELETE',
	getUrl(params) {
		const { tenantId, mappingId } = params;

		return `/${API_VERSION}/tenants/${tenantId}/mappings/${mappingId}`;
	},
};

const queryMappingRulesByTenant: Endpoint<Pick<Tenant, 'tenantId'>> = {
	method: 'POST',
	getUrl(params) {
		const { tenantId } = params;

		return `/${API_VERSION}/tenants/${tenantId}/mappings/search`;
	},
};

const assignGroupToTenant: Endpoint<Pick<Tenant, 'tenantId'> & Pick<Group, 'groupId'>> = {
	method: 'PUT',
	getUrl(params) {
		const { tenantId, groupId } = params;

		return `/${API_VERSION}/tenants/${tenantId}/groups/${groupId}`;
	},
};

const removeGroupFromTenant: Endpoint<Pick<Tenant, 'tenantId'> & Pick<Group, 'groupId'>> = {
	method: 'DELETE',
	getUrl(params) {
		const { tenantId, groupId } = params;

		return `/${API_VERSION}/tenants/${tenantId}/groups/${groupId}`;
	},
};

const assignRoleToTenant: Endpoint<Pick<Tenant, 'tenantId'> & Pick<Role, 'roleId'>> = {
	method: 'PUT',
	getUrl(params) {
		const { tenantId, roleId } = params;

		return `/${API_VERSION}/tenants/${tenantId}/roles/${roleId}`;
	},
};

const removeRoleFromTenant: Endpoint<Pick<Tenant, 'tenantId'> & Pick<Role, 'roleId'>> = {
	method: 'DELETE',
	getUrl(params) {
		const { tenantId, roleId } = params;

		return `/${API_VERSION}/tenants/${tenantId}/roles/${roleId}`;
	},
};

export {
	createTenant,
	getTenant,
	updateTenant,
	deleteTenant,
	queryTenants,
	assignUserToTenant,
	removeUserFromTenant,
	queryUsersByTenant,
	queryClientsByTenant,
	queryGroupsByTenant,
	queryRolesByTenant,
	assignClientToTenant,
	removeClientFromTenant,
	assignMappingRuleToTenant,
	removeMappingRuleFromTenant,
	queryMappingRulesByTenant,
	assignGroupToTenant,
	removeGroupFromTenant,
	assignRoleToTenant,
	removeRoleFromTenant,
	tenantSchema,
	createTenantRequestBodySchema,
	createTenantResponseBodySchema,
	updateTenantRequestBodySchema,
	updateTenantResponseBodySchema,
	queryTenantsRequestBodySchema,
	queryTenantsResponseBodySchema,
	tenantUserSchema,
	queryUsersByTenantRequestBodySchema,
	queryUsersByTenantResponseBodySchema,
	tenantClientSchema,
	queryClientsByTenantRequestBodySchema,
	queryClientsByTenantResponseBodySchema,
	queryGroupsByTenantRequestBodySchema,
	queryGroupsByTenantResponseBodySchema,
	queryRolesByTenantRequestBodySchema,
	queryRolesByTenantResponseBodySchema,
	queryMappingRulesByTenantRequestBodySchema,
	queryMappingRulesByTenantResponseBodySchema,
};
export type {
	Tenant,
	CreateTenantRequestBody,
	CreateTenantResponseBody,
	UpdateTenantRequestBody,
	UpdateTenantResponseBody,
	QueryTenantsRequestBody,
	QueryTenantsResponseBody,
	TenantUser,
	QueryUsersByTenantRequestBody,
	QueryUsersByTenantResponseBody,
	TenantClient,
	QueryClientsByTenantRequestBody,
	QueryClientsByTenantResponseBody,
	QueryGroupsByTenantRequestBody,
	QueryGroupsByTenantResponseBody,
	QueryRolesByTenantRequestBody,
	QueryRolesByTenantResponseBody,
	QueryMappingRulesByTenantRequestBody,
	QueryMappingRulesByTenantResponseBody,
};
