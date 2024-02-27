export interface IRouter {
    name: string,
    route: string,
    faIcon: string
}

export const Dashboard: IRouter = {
    name: 'Dashboard',
    route: '/dashboard',
    faIcon: 'fa-chart-line'
}

export const UserManagement: IRouter = {
    name: 'User Management',
    route: '/user-management',
    faIcon: 'fa-users-gear'
}

export const AttendanceRegister: IRouter = {
    name: 'Attendance Register',
    route: '/attendance-register',
    faIcon: 'fa-solid fa-clipboard-user'
}

export const LeaveManagement: IRouter = {
    name: 'Leave Management',
    route: '/leave-management',
    faIcon: 'fa-person-walking-dashed-line-arrow-right'
}

export const IKMManagement: IRouter = {
    name: 'IKM Management',
    route: '/ikm-management',
    faIcon: 'fa-user-graduate'
}

export const GoalManagement: IRouter = {
    name: 'Goal Management',
    route: '/goal-management',
    faIcon: 'fa-bullseye'
}

export const Applicant: IRouter = {
    name: 'Goal Management',
    route: '/goal-management',
    faIcon: 'fa-house'
}