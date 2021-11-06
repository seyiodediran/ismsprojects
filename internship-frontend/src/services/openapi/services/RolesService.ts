/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CreateRoleDto } from '../models/CreateRoleDto';
import type { Role } from '../models/Role';
import type { UpdateRoleDto } from '../models/UpdateRoleDto';
import type { CancelablePromise } from '../core/CancelablePromise';
import { request as __request } from '../core/request';

export class RolesService {

    /**
     * Creates a Role
     * @param requestBody
     * @returns Role Role created successfully
     * @throws ApiError
     */
    public static rolesControllerCreate(
        requestBody: CreateRoleDto,
    ): CancelablePromise<Role> {
        return __request({
            method: 'POST',
            path: `/roles`,
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                400: `Bad request: constraint problem`,
                500: `Internal server error`,
            },
        });
    }

    /**
     * Fetches all roles
     * @returns Role Roles fetched successfully
     * @throws ApiError
     */
    public static rolesControllerFindAll(): CancelablePromise<Role> {
        return __request({
            method: 'GET',
            path: `/roles`,
            errors: {
                400: `Bad request: constraint problem`,
                500: `Internal server error`,
            },
        });
    }

    /**
     * Fetches a role
     * @param id
     * @returns Role Role fetched successfully
     * @throws ApiError
     */
    public static rolesControllerFindOne(
        id: string,
    ): CancelablePromise<Role> {
        return __request({
            method: 'GET',
            path: `/roles/${id}`,
            errors: {
                400: `Bad request: constraint problem`,
                500: `Internal server error`,
            },
        });
    }

    /**
     * Updates a role
     * @param id
     * @param requestBody
     * @returns Role Role updated successfully
     * @throws ApiError
     */
    public static rolesControllerUpdate(
        id: string,
        requestBody: UpdateRoleDto,
    ): CancelablePromise<Role> {
        return __request({
            method: 'PATCH',
            path: `/roles/${id}`,
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                400: `Bad request: constraint problem`,
                500: `Internal server error`,
            },
        });
    }

    /**
     * Removes a role
     * @param id
     * @returns Role Role removed successfully
     * @throws ApiError
     */
    public static rolesControllerRemove(
        id: string,
    ): CancelablePromise<Role> {
        return __request({
            method: 'DELETE',
            path: `/roles/${id}`,
            errors: {
                400: `Bad request: constraint problem`,
                500: `Internal server error`,
            },
        });
    }

    /**
     * Adds a user to a role
     * @param roleId
     * @param userId
     * @returns Role User added to role successfully
     * @throws ApiError
     */
    public static rolesControllerAddUserById(
        roleId: string,
        userId: string,
    ): CancelablePromise<Role> {
        return __request({
            method: 'PATCH',
            path: `/roles/${roleId}/users/${userId}`,
            errors: {
                400: `Bad request: constraint problem`,
                500: `Internal server error`,
            },
        });
    }

    /**
     * Removes a user from a role
     * @param roleId
     * @param userId
     * @returns Role User removed from role successfully
     * @throws ApiError
     */
    public static rolesControllerRemoveUserById(
        roleId: string,
        userId: string,
    ): CancelablePromise<Role> {
        return __request({
            method: 'DELETE',
            path: `/roles/${roleId}/users/${userId}`,
            errors: {
                400: `Bad request: constraint problem`,
                500: `Internal server error`,
            },
        });
    }

    /**
     * Adds one or more users to a role
     * @param roleId
     * @returns Role User(s) added to role successfully
     * @throws ApiError
     */
    public static rolesControllerAddUsersById(
        roleId: string,
    ): CancelablePromise<Role> {
        return __request({
            method: 'PATCH',
            path: `/roles/${roleId}/users`,
            errors: {
                400: `Bad request: constraint problem`,
                500: `Internal server error`,
            },
        });
    }

    /**
     * Removes one or more users from a role
     * @param roleId
     * @returns Role Users removed from a role successfully
     * @throws ApiError
     */
    public static rolesControllerRemoveUsersById(
        roleId: string,
    ): CancelablePromise<Role> {
        return __request({
            method: 'DELETE',
            path: `/roles/${roleId}/users`,
            errors: {
                400: `Bad request: constraint problem`,
                500: `Internal server error`,
            },
        });
    }

}