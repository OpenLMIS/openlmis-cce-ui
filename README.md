# OpenLMIS-UI Template
This is a template for OpenLMIS-UI projects, that make additions to the
OpenLMIS-UI framework. This repository can be used to:
* Create UI for OpenLMIS Services
* Create reusable UI components, so they can be reused by other OpenLMIS-UI projects
* Create build process tasks to change how other OpenLMIS-UI projects are compiled
* Create running OpenLMIS-UI images, but we suggest you fork the [OpenLMIS Reference UI](https://github.com/OpenLMIS/openlmis-reference-ui)

## Using the OpenLMIS-UI Template
To get started, *fork this repository.* Then modify the docker-compose.yml to
pull in the other OpenLMIS-UI projects your project needs as dependancies.

This template repository contains the required dependencies to start an
OpenLMIS-UI for a new service. The included dependencies are:
* *OpenLMIS-UI Components* The base components that are reused within the OpenLMIS-UI
* *OpenLMIS-UI Layout* Base page layout
* *OpenLMIS Reference Data UI* UI services for core data in OpenLMIS 
* *OpenLMIS Auth UI* UI that allows for authentication
* There is also an 'example' page to get UI implementations started

*Remove the components you are not using.*

The rest of this document contains generic instructions for building and
working with this OpenLMIS-UI project, and *should be modified for your project.*

## Use with:
* *LIST REQUIRED OPENLMIS SERVICE VERSION HERE* (if applicable) 

## Prerequisites
* Docker 1.11+
* Docker Compose 1.6+

## Quick Start
1. Fork/clone this repository from GitHub.

 ```shell
 git clone https://github.com/OpenLMIS/openlmis-requisition-refUI.git
 ```
2. Develop w/ Docker by running `docker-compose run --service-ports requisition-ui`.
3. You should now be in an interactive shell inside the newly created development environment, build the project with: `npm install && grunt bower` and then you can build and start it with `grunt build --serve`.
4. Go to `http://localhost:9000/webapp/` to see the login page.

*Note:* To change the location of where the OpenLMIS-UI attemps to access OpenLMIS, use the command `grunt build --openlmisServerUrl=<openlmis server url> --serve`.

## Building & Testing
See the [OpenLMIS/dev-ui project](https://github.com/OpenLMIS/dev-ui) for more information on what commands are available, below are the command you might use during a normal work day.

```shell
// Open docker in an interactive shell
> docker-compose run --service-ports requisition-ui

// Install dependencies 
$ npm install
$ grunt bower

// Build and run the UI against a OpenLMIS server
$ grunt build --openlmisServerUrl=<openlmis server url> --serve

// Run unit tests
$ grunt karma:unit

// Run a watch process that will build and test your code
// NOTE: You must change a file at least once before your code is rebuilt
$ grunt watch --openlmisServerUrl=<openlmis server url> --serve

```

### Built Artifacts
After the OpenLMIS-UI is built and being served, you can access the following documents:
- `http://localhost:9000/webapp/` The compiled OpenLMIS application
- `http://localhost:9000/docs/` JS Documentation created from the source code
- `http://localhost:9000/styleguide/` KSS Documentation created from the CSS


### Build Deployment Image
The specialized docker-compose.builder.yml is geared toward CI and build
servers for automated building, testing and docker image generation of
the UI module.

```shell
> docker-compose pull
> docker-compose run ./build.sh requisition-ui
> docker-compose build image
```

### Internationalization (i18n)
Transifex has been integrated into the development and build process. In order to sync with the project's resources in Transifex, you must provide values for the following keys: TRANSIFEX_USER, TRANSIFEX_PASSWORD.

For the development environment in Docker, you can sync with Transifex by running the sync_transifex.sh script. This will upload your source messages file to the Transifex project and download translated messages files.

The build process has syncing with Transifex seamlessly built-in.
