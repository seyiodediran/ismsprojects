/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

export type UpdateRoleDto = {
    name?: string;
    description?: string;
    functionalArea?: UpdateRoleDto.functionalArea;
}

export namespace UpdateRoleDto {

    export enum functionalArea {
        HUMAN_RESOURCE = 'Human Resource',
        INFORMATION_TECH = 'Information Tech',
        OTHERS = 'Others',
    }


}
