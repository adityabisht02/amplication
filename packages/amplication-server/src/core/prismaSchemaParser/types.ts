import { ConcretePrismaSchemaBuilder } from "@mrleebo/prisma-ast";
import { CreateBulkEntitiesInput } from "../entity/entity.service";
import { ActionLog } from "../action/dto";
import { ActionContext } from "../userAction/types";

export type PrepareOperation = (
  prepareOperationIO: PrepareOperationIO
) => PrepareOperationIO;

export type PrepareOperationInput = {
  inputSchema: string;
  existingEntities: ExistingEntitySelect[];
  actionContext: ActionContext;
};

export type PrepareOperationIO = {
  builder: ConcretePrismaSchemaBuilder;
  existingEntities: ExistingEntitySelect[];
  mapper: Mapper;
  actionContext: ActionContext;
};

type ModelName = string; // original model name
type FieldName = string; // original field name
type FieldTypeName = string; // original field type name

export type Mapper = {
  modelNames: Record<ModelName, MapperItem>;
  fieldNames: Record<ModelName, Record<FieldName, MapperItem>>;
  fieldTypes: Record<
    ModelName,
    Record<ModelName, Record<FieldTypeName, MapperItem>>
  >;
  idFields: Record<ModelName, Record<FieldName, MapperItem>>;
};

export type MapperItem = {
  originalName: string;
  newName: string;
};

export type ConvertPrismaSchemaForImportObjectsResponse = {
  preparedEntitiesWithFields: CreateBulkEntitiesInput[];
  log: ActionLog[];
};

export type ExistingEntitySelect = {
  name: string;
};
