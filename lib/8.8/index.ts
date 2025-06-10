import { getCurrentUser } from './authentication';
import { getLicense } from './license';
import {
	createProcessInstance,
	getProcessInstance,
	getProcessInstanceCallHierarchy,
	getProcessInstanceStatistics,
	getProcessInstanceSequenceFlows,
} from './process-instance';
import {
	getUserTask,
	queryUserTasks,
	getUserTaskForm,
	getTask,
	assignTask,
	unassignTask,
	completeTask,
	queryVariablesByUserTask,
} from './user-task';
import { getVariable, queryVariables } from './variable';
import { getDecisionDefinitionXml } from './decision-definition';
import { getJobs } from './job';
import {
	getProcessDefinition,
	getProcessDefinitionStatistics,
	queryProcessDefinitions,
	getProcessDefinitionXml,
} from './process-definition';

const endpoints = {
	getCurrentUser,
	getLicense,
	getUserTask,
	queryUserTasks,
	getUserTaskForm,
	getTask,
	assignTask,
	unassignTask,
	completeTask,
	queryVariablesByUserTask,
	createProcessInstance,
	getVariable,
	queryVariables,
	getDecisionDefinitionXml,
	getJobs,
	getProcessDefinition,
	getProcessDefinitionStatistics,
	queryProcessDefinitions,
	getProcessDefinitionXml,
	getProcessInstance,
	getProcessInstanceCallHierarchy,
	getProcessInstanceStatistics,
	getProcessInstanceSequenceFlows,
} as const;

export { currentUserSchema, getCurrentUser, type CurrentUser } from './authentication';
export { licenseSchema, type License } from './license';
export {
	createProcessInstanceRequestBodySchema,
	createProcessInstanceResponseBodySchema,
	getProcessInstanceCallHierarchyResponseBodySchema,
	getProcessInstanceStatisticsResponseBodySchema,
	getProcessSequenceFlowsResponseBodySchema,
	processInstanceStateSchema,
	processInstanceSchema,
	sequenceFlowSchema,
	type CreateProcessInstanceRequestBody,
	type CreateProcessInstanceResponseBody,
	type CallHierarchy,
	type GetProcessInstanceCallHierarchyResponseBody,
	type SequenceFlow,
	type GetProcessSequenceFlowsResponseBody,
	type ProcessInstanceState,
	type StatisticName,
	type ProcessInstance,
	type GetProcessInstanceStatisticsResponseBody,
} from './process-instance';
export {
	userTaskSchema,
	queryUserTasksResponseBodySchema,
	queryUserTasksRequestBodySchema,
	formSchema,
	assignTaskRequestBodySchema,
	unassignTaskRequestBodySchema,
	completeTaskRequestBodySchema,
	queryVariablesByUserTaskRequestBodySchema,
	queryVariablesByUserTaskResponseBodySchema,
	type UserTask,
	type QueryUserTasksResponseBody,
	type QueryUserTasksRequestBody,
	type Form,
	type AssignTaskRequestBody,
	type UnassignTaskRequestBody,
	type CompleteTaskRequestBody,
	type QueryVariablesByUserTaskRequestBody,
	type QueryVariablesByUserTaskResponseBody,
} from './user-task';
export {
	variableSchema,
	queryVariablesRequestBodySchema,
	queryVariablesResponseBodySchema,
	type Variable,
	type QueryVariablesResponseBody,
	type QueryVariablesRequestBody,
} from './variable';
export {
	getDecisionDefinitionXmlResponseBodySchema,
	decisionDefinitionSchema,
	type DecisionDefinition,
	type GetDecisionDefinitionXmlResponseBody,
} from './decision-definition';
export {
	getJobsRequestBodySchema,
	getJobsResponseBodySchema,
	jobSchema,
	jobStateSchema,
	jobKindSchema,
	listenerEventTypeSchema,
	jobStateFilterSchema,
	jobKindFilterSchema,
	listenerEventTypeFilterSchema,
	type Job,
	type GetJobsRequestBody,
	type GetJobsResponseBody,
} from './job';
export {
	processDefinitionStatisticSchema,
	getProcessDefinitionStatisticsRequestBodySchema,
	getProcessDefinitionStatisticsResponseBodySchema,
	queryProcessDefinitionsRequestBodySchema,
	queryProcessDefinitionsResponseBodySchema,
	processDefinitionSchema,
	type ProcessDefinition,
	type ProcessDefinitionStatistic,
	type QueryProcessDefinitionsRequestBody,
	type QueryProcessDefinitionsResponseBody,
	type GetProcessDefinitionStatisticsRequestBody,
	type GetProcessDefinitionStatisticsResponseBody,
} from './process-definition';
export {
	problemDetailsSchema,
	queryPageSchema,
	querySortOrderSchema,
	problemDetailResponseSchema,
	type ProblemDetails,
	type QueryPage,
	type QuerySortOrder,
	type ProblemDetailsResponse,
} from './common';
export { endpoints };
