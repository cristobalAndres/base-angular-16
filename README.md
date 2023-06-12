# CwClUsersWebManager

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 16.0.4.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.

# Project Structure

The project has the following structure:

.
├── e2e/
├── node_modules/
├── src/
│ ├── app/
│ │ ├── core/ # Singleton services, unique shell components, and other startup components
│ │ │ ├── [+] authentication/ # Authentication service and login components
│ │ │ ├── [+] footer/ # Footer component
│ │ │ ├── [+] guards/ # Guards
│ │ │ ├── [+] header/ # Header component
│ │ │ ├── [+] interceptors/ # HTTP interceptors
│ │ │ ├── [+] services/ # All services that will be injected at the root
│ │ │ ├── core.module.ts # Core module (imports all components/directives/services that are in 'core')
│ │ │
│ │ ├── shared/ # All common components/directives/pipes/services used in more than one place
│ │ │ ├── [+] components/
│ │ │ ├── [+] directives/
│ │ │ ├── [+] pipes/
│ │ │ └── shared.module.ts # Shared module (imports all components/directives/pipes that are in 'shared')
│ │ │
│ │ ├── [+] pages/ # New folder 'pages'
│ │ │ ├── [+] users/ # Feature module for user management
│ │ │ ├── [+] transactions/ # Feature module for transaction management
│ │ ├── app.component.ts
│ │ ├── app.module.ts
│ │ └── app-routing.module.ts
│ │
│ ├── assets/ # Static files such as images, icons, etc.
│ ├── environments/ # Environment variables
│ ├── styles/ # Global style files
│ ├── index.html
│ ├── main.ts
│ ├── polyfills.ts
│ └── styles.scss
│
├── .editorconfig
├── .gitignore
├── angular.json
├── package.json
├── README.md
├── tsconfig.json
└── tslint.json