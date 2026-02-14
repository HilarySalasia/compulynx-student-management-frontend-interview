# CompuLynx Student Management System

A comprehensive Angular-based web application for managing student data with Excel/CSV import/export capabilities, real-time filtering, sorting, and pagination features.

## Table of Contents

- [Overview](#overview)
- [Technology Stack](#technology-stack)
- [Architecture](#architecture)
- [Features](#features)
- [User Interface (UI) Guide](#user-interface-ui-guide)
- [Getting Started](#getting-started)
- [Project Structure](#project-structure)
- [API Integration](#api-integration)
- [Key Components](#key-components)
- [Services](#services)
- [Development Guide](#development-guide)
- [For Product Managers](#for-product-managers)

---

## Overview

The CompuLynx Student Management System is a full-featured student data management application that enables users to:

- **Manage Student Records**: Create, read, update, and delete student information
- **Import Data**: Upload CSV files to bulk import student data
- **Export Data**: Export student data in multiple formats (Excel, CSV, PDF)
- **Generate Excel Files**: Create Excel files with specified number of rows
- **Convert Files**: Convert Excel files to CSV format
- **Search & Filter**: Search by student ID and filter by class name
- **Sort & Paginate**: Sort data by any column and paginate through large datasets

The application follows a modern Angular architecture with server-side rendering (SSR) support and provides a responsive, user-friendly interface built with Bootstrap and Angular Material.

---

## Technology Stack

### Frontend Framework
- **Angular 19.2.18** - Modern web framework with standalone components
- **TypeScript 5.5.2** - Type-safe JavaScript
- **RxJS 7.8.2** - Reactive programming for async operations

### UI Libraries
- **Bootstrap 5.3.8** - Responsive CSS framework
- **Angular Material 19.2.19** - Material Design components (dialogs, snackbars)
- **Font Awesome 7.2.0** - Icon library

### Build & Development
- **Angular CLI 19.2.19** - Development and build tooling
- **Angular SSR** - Server-side rendering support
- **Karma & Jasmine** - Testing framework

### Backend Integration
- **RESTful API** - Communicates with backend at `http://127.0.0.1:8080`
- **HTTP Client** - Angular HttpClient for API calls

---

## Architecture

### Application Structure

The application follows Angular's standalone component architecture:

```
src/app/
├── app.component.*          # Root component
├── app.routes.ts            # Route configuration
├── app.config.ts            # Application configuration
├── home/                    # Main feature module
│   ├── home.component.*     # Student management dashboard
│   └── modal/               # Modal dialogs
│       ├── generate-excel-modal/
│       ├── upload-file-modal/
│       └── edit-student-modal/
├── service/                 # Business logic services
│   ├── student.service.ts
│   ├── excel.service.ts
│   └── csv.service.ts
├── model/                   # TypeScript interfaces
│   ├── student.ts
│   └── paginatedStudent.ts
├── header/                  # Header component
├── navigation/              # Navigation component
├── footer/                  # Footer component
├── loading-screen/          # Global loading indicator
└── error-popup/            # Error handling component
```

### Data Flow

1. **User Interaction** → Component receives event
2. **Component** → Calls appropriate service method
3. **Service** → Makes HTTP request to backend API
4. **Backend** → Returns data/response
5. **Service** → Processes and returns Observable
6. **Component** → Updates UI with new data
7. **Loading Interceptor** → Shows/hides loading screen automatically

---

## Features

### 1. Student Data Management
- **View Students**: Paginated table view with customizable page size (5, 10, 20, 50, 100)
- **Edit Students**: Inline editing via modal dialog
- **Delete Students**: Remove individual student records
- **Edit Students**: Update student information (first name, last name, class, score)

### 2. Data Import
- **Upload CSV Files**: Bulk import student data from CSV files
- **File Validation**: Validates file type before upload
- **Error Handling**: Displays user-friendly error messages

### 3. Data Export
- **Excel Export**: Export all student data to Excel format (.xlsx)
- **CSV Export**: Export student data to CSV format
- **PDF Export**: Generate PDF reports of student data

### 4. Excel File Generation
- **Generate Excel Files**: Create Excel files with specified number of rows
- **Backend Processing**: Generation handled by backend API

### 5. File Conversion
- **Excel to CSV**: Convert uploaded Excel files to CSV format
- **File Type Validation**: Ensures only valid Excel files are accepted

### 6. Search & Filter
- **Search by Student ID**: Find specific students by ID
- **Filter by Class**: Filter students by class name (Class1-Class5, All Classes)
- **Real-time Updates**: Results update immediately upon filter change

### 7. Sorting
- **Multi-column Sorting**: Sort by Student ID, First Name, Last Name, Class Name, or Score
- **Ascending/Descending**: Toggle sort direction by clicking column headers
- **Visual Indicators**: Arrow indicators (↑/↓) show current sort column and direction

### 8. Pagination
- **Server-side Pagination**: Efficient handling of large datasets
- **Page Navigation**: Previous/Next buttons and direct page number selection
- **Page Size Control**: Adjustable items per page
- **Page Information**: Displays current page, total pages, and record counts

---

## User Interface (UI) Guide

### Layout Structure

The application uses a responsive Bootstrap grid layout with the following sections:

#### 1. **Header Section** (`app-header`)
- **Location**: Top of the page, sticky position
- **Components**:
  - CompuLynx company logo (left)
  - "Compulynx Student Portal" title (center)
  - "Data as Power" tagline (right)
- **Styling**: Light background with responsive columns

#### 2. **Navigation Section** (`app-navigation`)
- **Location**: Below header, sticky position
- **Purpose**: Currently empty but reserved for future navigation elements

#### 3. **Content Section** (`router-outlet`)
- **Location**: Main content area, scrollable (max-height: 72vh)
- **Primary Component**: Home component with student management features

#### 4. **Footer Section** (`app-footer`)
- **Location**: Bottom of the page
- **Purpose**: Footer information (component exists but content may vary)

### Home Component UI Breakdown

#### **Action Buttons Section** (Top Row)

**Left Side:**
- **Generate Excel File** (Primary Blue Button)
  - Opens modal to specify number of rows
  - Generates Excel file via backend API
  
- **Convert Excel to CSV File** (Secondary Gray Button)
  - Opens file upload modal
  - Accepts .xlsx or .xls files
  - Converts to CSV format
  
- **Upload Student Data** (Success Green Button)
  - Opens file upload modal
  - Accepts CSV files only
  - Bulk imports student data to system

**Right Side:**
- **Export Data Dropdown** (Select Menu)
  - Options: Excel, CSV, PDF
  - Triggers file download in selected format
  - Shows loading indicator during export

#### **Search & Filter Section** (Second Row)

**Left Side:**
- **Search by Student ID**
  - Text input field
  - Search button
  - Searches for exact student ID match
  - Displays single result or empty state

**Right Side:**
- **Filter by Class Dropdown**
  - Options: "Select A Class", "All Classes", "Class1" through "Class5"
  - Auto-triggers filter on selection change
  - Updates table data immediately

#### **Student Data Table**

**Table Structure:**
- **Checkbox Column**: Select individual students (multi-select capability)
- **Student ID Column**: Clickable header for sorting (↑/↓ indicators)
- **First Name Column**: Clickable header for sorting
- **Last Name Column**: Clickable header for sorting
- **Class Name Column**: Clickable header for sorting
- **Score Column**: Clickable header for sorting
- **Actions Column**: Edit and Delete buttons per row

**Table Features:**
- **Empty State**: Shows "No records found" message when no data
- **Row Actions**:
  - **Edit Button** (Green): Opens edit modal with pre-filled student data
  - **Delete Button** (Red): Removes student after confirmation (with loading state)

**Sorting Behavior:**
- Click any column header to sort
- First click: Ascending (↑)
- Second click: Descending (↓)
- Visual indicator shows active sort column and direction
- Sorting is server-side for performance

#### **Pagination Section** (Bottom of Table)

**Left Side:**
- **Record Count**: "Showing X of Y students"
- **Items Per Page Dropdown**:
  - Options: 5, 10, 20, 50, 100
  - Resets to page 1 when changed
  - Updates table immediately

**Right Side:**
- **Total Pages Display**: Shows total number of pages

**Pagination Controls:**
- **Previous Button**: Disabled on first page
- **Page Numbers**: Shows up to 20 visible page numbers
  - Current page highlighted
  - Click any number to navigate
- **Next Button**: Disabled on last page

### Modal Dialogs

#### 1. **Generate Excel Modal**
- **Trigger**: "Generate Excel File" button
- **Fields**:
  - Number of Rows (number input, min: 1)
- **Actions**:
  - Cancel: Closes modal
  - Generate: Calls API, shows success/error notification
- **Validation**: Requires positive number input

#### 2. **Upload File Modal**
- **Trigger**: "Convert Excel to CSV" or "Upload Student Data" buttons
- **Dynamic Title**: Changes based on action (Convert vs Upload)
- **Fields**:
  - File Input (accepts .xlsx/.xls for convert, .csv for upload)
- **File Validation**:
  - Excel conversion: Validates .xlsx/.xls MIME types and extensions
  - CSV upload: Validates .csv MIME type and extension
  - Shows error notification for invalid files
- **Actions**:
  - Cancel: Closes modal
  - Upload: Processes file, shows success/error notification

#### 3. **Edit Student Modal**
- **Trigger**: "Edit" button on student row
- **Fields** (Pre-filled with current data):
  - First Name (text input)
  - Last Name (text input)
  - Class Name (dropdown: Class1-Class5)
  - Score (number input, min: 1)
- **Actions**:
  - Cancel: Closes modal without saving
  - Update: Saves changes, refreshes table, shows notification

### Loading States

- **Global Loading Screen**: Appears during all HTTP requests
- **Automatic Management**: Handled by HTTP interceptor
- **Visual Feedback**: Overlay with loading indicator
- **Duration**: Shows until request completes (with 5-second minimum in some cases)

### Notifications

- **Success Notifications**: Green snackbar (top-right, 5-second duration)
  - "Student Data removed successfully"
  - "Data Updated Successfully"
  - "Data Uploaded Successfully"
  - Excel generation success messages

- **Error Notifications**: Red snackbar (top-right, 5-second duration)
  - API error messages
  - File validation errors
  - Network errors

### Responsive Design

- **Breakpoints**: Uses Bootstrap's responsive grid (sm, md, lg, xl, xxl)
- **Mobile-Friendly**: Buttons and inputs stack vertically on small screens
- **Table Scrolling**: Horizontal scroll on mobile devices
- **Modal Dialogs**: Centered and responsive across all screen sizes

---

## Getting Started

### Prerequisites

- **Node.js**: Version 18.x or higher
- **Package Manager**: npm, yarn, or pnpm (project uses pnpm)
- **Backend API**: Running on `http://127.0.0.1:8080`

### Installation

1. **Clone the repository** (if applicable) or navigate to the project directory:
   ```bash
   cd compulynxExcelApp
   ```

2. **Install dependencies**:
   ```bash
   pnpm install
   # or
   npm install
   ```

3. **Configure environment**:
   - Edit `src/environments/environment.development.ts`
   - Update `apiUrl` if backend is on different host/port:
     ```typescript
     export const environment = {
       backend: {
         apiUrl: 'http://127.0.0.1:8080'
       }
     };
     ```

4. **Start development server**:
   ```bash
   ng serve
   # or
   npm start
   ```

5. **Access the application**:
   - Open browser to `http://localhost:4200`
   - Application will automatically reload on code changes

### Build for Production

```bash
ng build --configuration production
```

Output will be in `dist/compulynx-excel-app/` directory.

### Run with SSR (Server-Side Rendering)

```bash
npm run serve:ssr:compulynxExcelApp
```

---

## Project Structure

```
compulynxExcelApp/
├── public/                          # Static assets
│   ├── favicon.ico
│   └── images/
│       └── CompuLynx-Blue-Logo.png
├── src/
│   ├── app/
│   │   ├── app.component.*          # Root component
│   │   ├── app.routes.ts            # Routing configuration
│   │   ├── app.config.ts            # App configuration (HTTP, interceptors)
│   │   ├── home/                    # Main feature module
│   │   │   ├── home.component.*     # Student management UI
│   │   │   └── modal/               # Modal dialogs
│   │   │       ├── generate-excel-modal/
│   │   │       ├── upload-file-modal/
│   │   │       └── edit-student-modal/
│   │   ├── service/                 # Business logic
│   │   │   ├── student.service.ts   # Student CRUD operations
│   │   │   ├── excel.service.ts     # Excel generation & conversion
│   │   │   ├── csv.service.ts       # CSV upload & export
│   │   │   └── global-service.service.ts
│   │   ├── model/                   # TypeScript interfaces
│   │   │   ├── student.ts
│   │   │   ├── paginatedStudent.ts
│   │   │   └── textResponse.ts
│   │   ├── header/                  # Header component
│   │   ├── navigation/              # Navigation component
│   │   ├── footer/                  # Footer component
│   │   ├── loading-screen/          # Loading indicator
│   │   │   └── loading-screen.service.ts
│   │   ├── error-popup/            # Error handling
│   │   └── shared/                  # Shared utilities
│   │       └── loader-interceptor.service.ts
│   ├── assets/                      # Application assets
│   ├── environments/                # Environment configurations
│   ├── index.html                   # Entry HTML
│   ├── main.ts                      # Application entry point
│   └── styles.scss                  # Global styles
├── angular.json                     # Angular CLI configuration
├── package.json                     # Dependencies and scripts
├── tsconfig.json                    # TypeScript configuration
└── server.ts                        # SSR server configuration
```

---

## API Integration

### Base URL
```
http://127.0.0.1:8080
```

### Student API Endpoints (`/api/student`)

| Method | Endpoint | Description | Request Body | Response |
|--------|----------|-------------|--------------|----------|
| GET | `/api/student` | Get all students | - | `Student[]` |
| GET | `/api/student/{id}` | Get student by ID | - | `Student` |
| GET | `/api/student/paginated` | Get paginated & sorted students | Query params: `page`, `size`, `sortBy`, `sortDirection` | `PaginatedStudent` |
| GET | `/api/student/byClassName` | Get students by class | Query params: `className`, `page`, `size` | `PaginatedStudent` |
| PUT | `/api/student/{id}` | Update student | `Student` object | `Student` |
| DELETE | `/api/student/{id}` | Delete student | - | `void` |
| DELETE | `/api/student` | Delete all students | - | `void` |

### Excel API Endpoints (`/api/excel`)

| Method | Endpoint | Description | Request Body | Response |
|--------|----------|-------------|--------------|----------|
| GET | `/api/excel` | Generate Excel file | Query param: `numberOfRows` | `TextResponse` |
| POST | `/api/excel/convertToCsv` | Convert Excel to CSV | `FormData` (file) | `TextResponse` |
| POST | `/api/excel/exportToExcelFile` | Export all data to Excel | - | `Blob` (Excel file) |

### CSV API Endpoints (`/api/csv`)

| Method | Endpoint | Description | Request Body | Response |
|--------|----------|-------------|--------------|----------|
| POST | `/api/csv/uploadStudentsData` | Upload CSV file | `FormData` (file) | `Student[]` |
| POST | `/api/csv/exportToCsvFile` | Export all data to CSV | - | `Blob` (CSV file) |
| POST | `/api/csv/exportToPdfFile` | Export all data to PDF | - | `Blob` (PDF file) |

### Data Models

#### Student Interface
```typescript
interface Student {
  studentId: number;
  firstName: string;
  lastName: string;
  className: string;
  dob: Date;
  score: Number;
}
```

#### PaginatedStudent Interface
```typescript
interface PaginatedStudent {
  content: Student[];
  empty: boolean;
  first: boolean;
  last: boolean;
  number: number;
  numberOfElement: number;
  pageable: Pageable;
  sort: Sort;
  size: number;
  totalElements: number;
  totalPages: number;
}
```

---

## Key Components

### AppComponent
- **Purpose**: Root component, layout structure
- **Features**: 
  - Header, Navigation, Content, Footer layout
  - Router outlet for routing
  - Global error popup and loading screen

### HomeComponent
- **Purpose**: Main student management interface
- **Key Methods**:
  - `getPaginatedStudents()`: Fetches paginated data
  - `searchByStudentId()`: Searches by ID
  - `filterByClass()`: Filters by class name
  - `sort()`: Handles column sorting
  - `editStudent()`: Opens edit modal
  - `removeStudent()`: Deletes student
  - `exportData()`: Exports in various formats
  - `setPage()`: Handles pagination

### Modal Components

#### GenerateExcelModalComponent
- Generates Excel files with specified row count
- Validates input (positive number)
- Shows success/error notifications

#### UploadFileModalComponent
- Handles both Excel-to-CSV conversion and CSV upload
- Validates file types
- Shows progress and results

#### EditStudentModalComponent
- Pre-fills form with existing student data
- Updates student information
- Validates required fields

### LoadingScreenComponent
- Global loading indicator
- Controlled by `LoadingScreenService`
- Automatically shown/hidden by HTTP interceptor

---

## Services

### StudentService
- **Location**: `src/app/service/student.service.ts`
- **Methods**:
  - `getAllStudents()`: Fetch all students
  - `getStudentById(id)`: Get single student
  - `getStudentsWithPaginationAndSorting()`: Paginated & sorted list
  - `getStudentsByClassName()`: Filter by class
  - `editStudent(id, data)`: Update student
  - `deleteStudentById(id)`: Delete student
  - `deleteAllStudents()`: Delete all

### ExcelService
- **Location**: `src/app/service/excel.service.ts`
- **Methods**:
  - `generateExcelFile(rows)`: Generate Excel file
  - `convertExcelToCsv(file)`: Convert Excel to CSV
  - `exportToExcelFile()`: Export data to Excel

### CsvService
- **Location**: `src/app/service/csv.service.ts`
- **Methods**:
  - `uploadStudentsData(file)`: Upload CSV file
  - `exportToCsvFile()`: Export data to CSV
  - `exportToPdfFile()`: Export data to PDF

### LoadingScreenService
- **Location**: `src/app/loading-screen/loading-screen.service.ts`
- **Purpose**: Manages global loading state
- **Usage**: Observable `isLoading` subject

### LoaderInterceptorService
- **Location**: `src/app/shared/loader-interceptor.service.ts`
- **Purpose**: Automatically shows/hides loading screen for HTTP requests
- **Integration**: Registered in `app.config.ts`

---

## Development Guide

### Adding a New Feature

1. **Create Component**:
   ```bash
   ng generate component feature-name
   ```

2. **Create Service** (if needed):
   ```bash
   ng generate service service-name
   ```

3. **Add Route** (if needed):
   - Edit `src/app/app.routes.ts`

4. **Update API Service**:
   - Add methods to appropriate service file

### Code Style

- **Standalone Components**: All components use standalone architecture
- **TypeScript**: Strict typing, interfaces for data models
- **RxJS**: Observables for async operations
- **Error Handling**: Try-catch blocks and error notifications
- **Loading States**: Always show loading during async operations

### Testing

```bash
ng test
```

Runs unit tests via Karma test runner.

---

## For Product Managers

### Business Value

The CompuLynx Student Management System provides:

1. **Efficiency**: Bulk import/export capabilities reduce manual data entry time
2. **Data Integrity**: Validation and error handling ensure data quality
3. **Scalability**: Server-side pagination handles large datasets efficiently
4. **Flexibility**: Multiple export formats (Excel, CSV, PDF) for different use cases
5. **User Experience**: Intuitive interface with real-time feedback and loading states

### User Personas

1. **Administrator**: Manages all student records, imports bulk data, exports reports
2. **Teacher**: Views and filters student data by class, edits individual records
3. **Data Analyst**: Exports data in various formats for analysis

### Key User Flows

#### Flow 1: Bulk Import Student Data
1. User clicks "Upload Student Data"
2. Modal opens, user selects CSV file
3. System validates file type
4. File uploads to backend
5. Success notification appears
6. Table refreshes with new data

#### Flow 2: Search and Edit Student
1. User enters student ID in search field
2. Clicks "Search" button
3. Table shows matching student
4. User clicks "Edit" button
5. Modal opens with pre-filled data
6. User modifies fields
7. Clicks "Update"
8. Success notification appears
9. Table refreshes

#### Flow 3: Export Data Report
1. User selects export format (Excel/CSV/PDF) from dropdown
2. Loading screen appears
3. File downloads automatically
4. Loading screen disappears

#### Flow 4: Filter and Sort
1. User selects class from filter dropdown
2. Table updates immediately with filtered results
3. User clicks column header to sort
4. Table re-sorts, arrow indicator shows direction
5. User changes page size
6. Table adjusts pagination

### Performance Considerations

- **Server-side Pagination**: Only loads current page data, not entire dataset
- **Lazy Loading**: Components load on-demand via routing
- **HTTP Interceptor**: Centralized loading state management
- **Change Detection**: Optimized with OnPush strategy where applicable

### Future Enhancements (Recommendations)

1. **Bulk Actions**: Select multiple students and perform batch operations
2. **Advanced Search**: Search by name, date range, score range
3. **Data Validation**: Client-side validation before submission
4. **Export Filters**: Export only filtered/searched results
5. **Audit Log**: Track who made changes and when
6. **Role-based Access**: Different permissions for different user roles
7. **Real-time Updates**: WebSocket integration for live data updates
8. **Data Visualization**: Charts and graphs for student performance

---

## Troubleshooting

### Common Issues

1. **API Connection Errors**
   - Verify backend is running on `http://127.0.0.1:8080`
   - Check CORS settings on backend
   - Verify environment configuration

2. **File Upload Fails**
   - Check file size limits
   - Verify file format matches requirements
   - Check browser console for errors

3. **Loading Screen Stuck**
   - Check HTTP interceptor configuration
   - Verify all API calls complete properly
   - Check network tab for pending requests

---

## License

This project is proprietary software developed for CompuLynx.

---

## Support

For technical support or questions, please contact the development team.

---

**Last Updated**: 2024
**Version**: 0.0.0
**Framework**: Angular 19.2.18
