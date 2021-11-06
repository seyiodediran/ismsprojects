/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CreateUserProfileDto } from '../models/CreateUserProfileDto';
import type { UpdateUserProfileDto } from '../models/UpdateUserProfileDto';
import type { UserProfile } from '../models/UserProfile';
import type { CancelablePromise } from '../core/CancelablePromise';
import { request as __request } from '../core/request';

export class UserProfilesService {

    /**
     * Creates a user profile
     * @param requestBody
     * @returns UserProfile user profile created successfully
     * @throws ApiError
     */
    public static userProfilesControllerCreate(
        requestBody: CreateUserProfileDto,
    ): CancelablePromise<UserProfile> {
        return __request({
            method: 'POST',
            path: `/user-profiles`,
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                400: `Bad request: constraint problem`,
                500: `Internal server error`,
            },
        });
    }

    /**
     * Fetches all user profiles
     * @returns UserProfile User profiles fetched successfully
     * @throws ApiError
     */
    public static userProfilesControllerFindAll(): CancelablePromise<UserProfile> {
        return __request({
            method: 'GET',
            path: `/user-profiles`,
            errors: {
                400: `Bad request: constraint problem`,
                500: `Internal server error`,
            },
        });
    }

    /**
     * Fetches a user profile
     * @param id
     * @returns UserProfile User profile fetched successfully
     * @throws ApiError
     */
    public static userProfilesControllerFindOne(
        id: string,
    ): CancelablePromise<UserProfile> {
        return __request({
            method: 'GET',
            path: `/user-profiles/${id}`,
            errors: {
                400: `Bad request: constraint problem`,
                500: `Internal server error`,
            },
        });
    }

    /**
     * Updates a user profile
     * @param id
     * @param requestBody
     * @returns UserProfile User profile updated successfully
     * @throws ApiError
     */
    public static userProfilesControllerUpdate(
        id: string,
        requestBody: UpdateUserProfileDto,
    ): CancelablePromise<UserProfile> {
        return __request({
            method: 'PATCH',
            path: `/user-profiles/${id}`,
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                400: `Bad request: constraint problem`,
                500: `Internal server error`,
            },
        });
    }

    /**
     * Removes a user profile
     * @param id
     * @returns UserProfile User profile removed successfully
     * @throws ApiError
     */
    public static userProfilesControllerRemove(
        id: string,
    ): CancelablePromise<UserProfile> {
        return __request({
            method: 'DELETE',
            path: `/user-profiles/${id}`,
            errors: {
                400: `Bad request: constraint problem`,
                500: `Internal server error`,
            },
        });
    }

}