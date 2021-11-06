/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { User } from './User';

export type Role = {
    id: number;
    name: string;
    description: string;
    functionalArea: Role.functionalArea;
    users: Array<User>;
}

export namespace Role {

    export enum functionalArea {
        HUMAN_RESOURCE = 'Human Resource',
        INFORMATION_TECH = 'Information Tech',
        OTHERS = 'Others',
    }


}
