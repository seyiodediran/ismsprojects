/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CreateDepartmentDto } from '../models/CreateDepartmentDto';
import type { Department } from '../models/Department';
import type { UpdateDepartmentDto } from '../models/UpdateDepartmentDto';
import type { CancelablePromise } from '../core/CancelablePromise';
import { request as __request } from '../core/request';

export class DepartmentsService {

    /**
     * Creates a department
     * @param requestBody
     * @returns Department Department created successfully
     * @throws ApiError
     */
    public static departmentsControllerCreate(
        requestBody: CreateDepartmentDto,
    ): CancelablePromise<Department> {
        return __request({
            method: 'POST',
            path: `/departments`,
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                400: `Bad request: constraint problem`,
                500: `Internal server error`,
            },
        });
    }

    /**
     * Fetches all departments
     * @returns Department Departments fetched successfully
     * @throws ApiError
     */
    public static departmentsControllerFindAll(): CancelablePromise<Department> {
        return __request({
            method: 'GET',
            path: `/departments`,
            errors: {
                400: `Bad request: constraint problem`,
                500: `Internal server error`,
            },
        });
    }

    /**
     * Fetches a departments
     * @param id
     * @returns Department Department fetched successfully
     * @throws ApiError
     */
    public static departmentsControllerFindOne(
        id: string,
    ): CancelablePromise<Department> {
        return __request({
            method: 'GET',
            path: `/departments/${id}`,
            errors: {
                400: `Bad request: constraint problem`,
                500: `Internal server error`,
            },
        });
    }

    /**
     * FUpdates a departments
     * @param id
     * @param requestBody
     * @returns Department Department updated successfully
     * @throws ApiError
     */
    public static departmentsControllerUpdate(
        id: string,
        requestBody: UpdateDepartmentDto,
    ): CancelablePromise<Department> {
        return __request({
            method: 'PATCH',
            path: `/departments/${id}`,
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                400: `Bad request: constraint problem`,
                500: `Internal server error`,
            },
        });
    }

    /**
     * Removes a departments
     * @param id
     * @returns Department Department removed successfully
     * @throws ApiError
     */
    public static departmentsControllerRemove(
        id: string,
    ): CancelablePromise<Department> {
        return __request({
            method: 'DELETE',
            path: `/departments/${id}`,
            errors: {
                400: `Bad request: constraint problem`,
                500: `Internal server error`,
            },
        });
    }

    /**
     * Adds an employee to a department
     * @param departmentId
     * @param employeeId
     * @returns Department Employee added to department successfully
     * @throws ApiError
     */
    public static departmentsControllerAddEmployeeById(
        departmentId: string,
        employeeId: string,
    ): CancelablePromise<Department> {
        return __request({
            method: 'PATCH',
            path: `/departments/${departmentId}/employees/employeeId`,
            errors: {
                400: `Bad request: constraint problem`,
                500: `Internal server error`,
            },
        });
    }

    /**
     * Removes an employee from a department
     * @param departmentId
     * @param employeeId
     * @returns Department Employee removed from department successfully
     * @throws ApiError
     */
    public static departmentsControllerRemoveEmployeeById(
        departmentId: string,
        employeeId: string,
    ): CancelablePromise<Department> {
        return __request({
            method: 'DELETE',
            path: `/departments/${departmentId}/employees/employeeId`,
            errors: {
                400: `Bad request: constraint problem`,
                500: `Internal server error`,
            },
        });
    }

    /**
     * Adds one or more employees to a department
     * @param departmentId
     * @returns Department Employee(s) added to department successfully
     * @throws ApiError
     */
    public static departmentsControllerAddEmployeesById(
        departmentId: string,
    ): CancelablePromise<Department> {
        return __request({
            method: 'PATCH',
            path: `/departments/${departmentId}/employees`,
            errors: {
                400: `Bad request: constraint problem`,
                500: `Internal server error`,
            },
        });
    }

    /**
     * Removes one or more employees from a department
     * @param departmentId
     * @returns Department Employee(s) removed from department successfully
     * @throws ApiError
     */
    public static departmentsControllerRemoveEmployeesById(
        departmentId: string,
    ): CancelablePromise<Department> {
        return __request({
            method: 'DELETE',
            path: `/departments/${departmentId}/employees`,
            errors: {
                400: `Bad request: constraint problem`,
                500: `Internal server error`,
            },
        });
    }

}