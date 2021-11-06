/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CreateUserDto } from '../models/CreateUserDto';
import type { UpdateUserDto } from '../models/UpdateUserDto';
import type { User } from '../models/User';
import type { CancelablePromise } from '../core/CancelablePromise';
import { request as __request } from '../core/request';

export class UsersService {

    /**
     * Create a new user
     * @param requestBody
     * @returns User User successfully created
     * @throws ApiError
     */
    public static usersControllerCreate(
        requestBody: CreateUserDto,
    ): CancelablePromise<User> {
        return __request({
            method: 'POST',
            path: `/users`,
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                400: `Bad request: constraint problem`,
                500: `Internal server error`,
            },
        });
    }

    /**
     * Find users based on options provided in query. The query key expected is find-options
     * @param findOptions
     * @returns User Successfully fetched users with options passed
     * @throws ApiError
     */
    public static usersControllerFindAll(
        findOptions: any,
    ): CancelablePromise<User> {
        return __request({
            method: 'GET',
            path: `/users`,
            query: {
                'find-options': findOptions,
            },
            errors: {
                400: `Bad request: constraint problem`,
                500: `Internal server error`,
            },
        });
    }

    /**
     * Finds a user
     * @param id
     * @returns User Successfully fetched one user
     * @throws ApiError
     */
    public static usersControllerFindOne(
        id: string,
    ): CancelablePromise<User> {
        return __request({
            method: 'GET',
            path: `/users/${id}`,
            errors: {
                400: `Bad request: constraint problem`,
                500: `Internal server error`,
            },
        });
    }

    /**
     * Updates a user
     * @param id
     * @param requestBody
     * @returns User Successfully updated a user
     * @throws ApiError
     */
    public static usersControllerUpdate(
        id: string,
        requestBody: UpdateUserDto,
    ): CancelablePromise<User> {
        return __request({
            method: 'PATCH',
            path: `/users/${id}`,
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                400: `Bad request: constraint problem`,
                500: `Internal server error`,
            },
        });
    }

    /**
     * Removes a user
     * @param id
     * @returns User Successfully removed a user
     * @throws ApiError
     */
    public static usersControllerRemove(
        id: string,
    ): CancelablePromise<User> {
        return __request({
            method: 'DELETE',
            path: `/users/${id}`,
            errors: {
                400: `Bad request: constraint problem`,
                500: `Internal server error`,
            },
        });
    }

    /**
     * Adds a role to a user
     * @param userId
     * @param roleId
     * @returns User Successfully added a role to a user
     * @throws ApiError
     */
    public static usersControllerAddRoleById(
        userId: string,
        roleId: string,
    ): CancelablePromise<User> {
        return __request({
            method: 'PATCH',
            path: `/users/${userId}/roles/${roleId}`,
            errors: {
                400: `Bad request: constraint problem`,
                500: `Internal server error`,
            },
        });
    }

    /**
     * @param userId
     * @param roleId
     * @returns any
     * @throws ApiError
     */
    public static usersControllerRemoveRoleById(
        userId: string,
        roleId: string,
    ): CancelablePromise<any> {
        return __request({
            method: 'DELETE',
            path: `/users/${userId}/roles/${roleId}`,
        });
    }

    /**
     * Removes multiple roles to a user
     * @param userId
     * @returns User Successfully Removed multiple roles to a user
     * @throws ApiError
     */
    public static usersControllerAddRolesById(
        userId: string,
    ): CancelablePromise<User> {
        return __request({
            method: 'PATCH',
            path: `/users/${userId}/roles`,
            errors: {
                400: `Bad request: constraint problem`,
                500: `Internal server error`,
            },
        });
    }

    /**
     * Removes a role from a user
     * @param userId
     * @returns User Successfully removed a role to a user
     * @throws ApiError
     */
    public static usersControllerRemoveRolesById(
        userId: string,
    ): CancelablePromise<User> {
        return __request({
            method: 'DELETE',
            path: `/users/${userId}/roles`,
            errors: {
                400: `Bad request: constraint problem`,
                500: `Internal server error`,
            },
        });
    }

    /**
     * Adds user profile to a user
     * @param userId
     * @param userProfileId
     * @returns User Successfully added a user profile to a user
     * @throws ApiError
     */
    public static usersControllerSetUserProfileById(
        userId: string,
        userProfileId: string,
    ): CancelablePromise<User> {
        return __request({
            method: 'PATCH',
            path: `/users/${userId}/user-profiles/${userProfileId}`,
            errors: {
                400: `Bad request: constraint problem`,
                500: `Internal server error`,
            },
        });
    }

    /**
     * Removes a user profile to a user
     * @param userId
     * @returns User Successfully removed a user profile to a user
     * @throws ApiError
     */
    public static usersControllerUnsetUserProfileById(
        userId: string,
    ): CancelablePromise<User> {
        return __request({
            method: 'DELETE',
            path: `/users/${userId}/user-profiles`,
            errors: {
                400: `Bad request: constraint problem`,
                500: `Internal server error`,
            },
        });
    }

}