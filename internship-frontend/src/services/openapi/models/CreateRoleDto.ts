/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

export type CreateRoleDto = {
    name: string;
    description?: string;
    functionalArea?: CreateRoleDto.functionalArea;
}

export namespace CreateRoleDto {

    export enum functionalArea {
        HUMAN_RESOURCE = 'Human Resource',
        INFORMATION_TECH = 'Information Tech',
        OTHERS = 'Others',
    }


}
