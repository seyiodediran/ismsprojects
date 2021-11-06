/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CreateEmployeeDto } from '../models/CreateEmployeeDto';
import type { Employee } from '../models/Employee';
import type { UpdateEmployeeDto } from '../models/UpdateEmployeeDto';
import type { CancelablePromise } from '../core/CancelablePromise';
import { request as __request } from '../core/request';

export class EmployeesService {

    /**
     * Create a new employee
     * @param requestBody
     * @returns Employee Employee successfully created
     * @throws ApiError
     */
    public static employeesControllerCreate(
        requestBody: CreateEmployeeDto,
    ): CancelablePromise<Employee> {
        return __request({
            method: 'POST',
            path: `/employees`,
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                400: `Bad request: constraint problem`,
                500: `Internal server error`,
            },
        });
    }

    /**
     * @param findOptions
     * @returns Employee Successfully fetched employees with options passed
     * @throws ApiError
     */
    public static employeesControllerFindAll(
        findOptions: any,
    ): CancelablePromise<Employee> {
        return __request({
            method: 'GET',
            path: `/employees`,
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
     * Fetches an employee
     * @param id
     * @returns Employee Successfully fetched an employee
     * @throws ApiError
     */
    public static employeesControllerFindOne(
        id: string,
    ): CancelablePromise<Employee> {
        return __request({
            method: 'GET',
            path: `/employees/${id}`,
            errors: {
                400: `Bad request: constraint problem`,
                500: `Internal server error`,
            },
        });
    }

    /**
     * Updates an employee
     * @param id
     * @param requestBody
     * @returns Employee Employee updated successfully
     * @throws ApiError
     */
    public static employeesControllerUpdate(
        id: string,
        requestBody: UpdateEmployeeDto,
    ): CancelablePromise<Employee> {
        return __request({
            method: 'PATCH',
            path: `/employees/${id}`,
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                400: `Bad request: constraint problem`,
                500: `Internal server error`,
            },
        });
    }

    /**
     * Removes an employee
     * @param id
     * @returns Employee Employee removed successfully
     * @throws ApiError
     */
    public static employeesControllerRemove(
        id: string,
    ): CancelablePromise<Employee> {
        return __request({
            method: 'DELETE',
            path: `/employees/${id}`,
            errors: {
                400: `Bad request: constraint problem`,
                500: `Internal server error`,
            },
        });
    }

    /**
     * Adds a user as an employee
     * @param employeeid
     * @param userid
     * @returns Employee Successfully added user as an employee
     * @throws ApiError
     */
    public static employeesControllerSetUserById(
        employeeid: string,
        userid: string,
    ): CancelablePromise<Employee> {
        return __request({
            method: 'PATCH',
            path: `/employees/${employeeid}/users/${userid}`,
            errors: {
                400: `Bad request: constraint problem`,
                500: `Internal server error`,
            },
        });
    }

    /**
     * Removes a user as an employee
     * @param employeeid
     * @returns Employee Successfully removed a user as an employee
     * @throws ApiError
     */
    public static employeesControllerUnsetUserById(
        employeeid: string,
    ): CancelablePromise<Employee> {
        return __request({
            method: 'DELETE',
            path: `/employees/${employeeid}/users`,
            errors: {
                400: `Bad request: constraint problem`,
                500: `Internal server error`,
            },
        });
    }

    /**
     * Adds a department to an employee
     * @param employeeid
     * @param departmentid
     * @returns Employee Successfully added a department to an employee
     * @throws ApiError
     */
    public static employeesControllerSetDepartmentById(
        employeeid: string,
        departmentid: string,
    ): CancelablePromise<Employee> {
        return __request({
            method: 'PATCH',
            path: `/employees/${employeeid}/departments/${departmentid}`,
            errors: {
                400: `Bad request: constraint problem`,
                500: `Internal server error`,
            },
        });
    }

    /**
     * Removes a department from an employee
     * @param employeeId
     * @returns Employee Successfully removed a department from an employee
     * @throws ApiError
     */
    public static employeesControllerUnsetDepartmentById(
        employeeId: string,
    ): CancelablePromise<Employee> {
        return __request({
            method: 'DELETE',
            path: `/employees/${employeeId}/department`,
            errors: {
                400: `Bad request: constraint problem`,
                500: `Internal server error`,
            },
        });
    }

}