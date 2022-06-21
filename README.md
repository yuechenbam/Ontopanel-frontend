# Ontopanel-frontend

## What is Ontopanel?

Ontopanel is a plugin in [diagrams.net](https://github.com/jgraph/drawio) that helps domain experts to build ontologies and method graph in a simpler way.

It is designed within the framework of the [Materials Open Laboratory (MatOLab)](https://github.com/Mat-O-Lab) by [Bundesanstalt für Materialforschung und -prüfung (BAM)](https://www.bam.de/Navigation/DE/Home/home.html) to solve the problems encountered by domain experts when building ontologies graphically using diagrames.net, such as ontology reuse, ontology transformation and data mapping.

It consist of three tools, their tutorials can be found in [Ontopanel video tutorials ](https://github.com/yuechenbam/yuechenbam.github.io):

### Library

Ontopanel-Library is a XML library for ontology conceptualization that provides a set of shapes to represent each element of the OWL specification. It is based on Chowlk library.

### EntityManager

EntityManager is a tool that allows user to upload their ontologies and export entities in diagrams.net. It contains a default ontology- MSEO, the ontology developed in the MatOLab project.

### Convertor:

Convertor is a tool that validates current graph and convert it into diagrams.net into OWL. It can also realize data mapping -- to combine experimental dataset with the method graph.

## Frontend

This project is the frontend of Ontopanel and works with [Ontopanel-backend](https://github.com/yuechenbam/Ontopanel-backend).

Diagrams.net provides access to load plugins by adding the URL of your plugin script in the web application via Extra-plugins.
However, this feature is turned off for the official web application. Therefore, you must set up your own server, such as a GithubPage, to allow the diagrams.net application to load your own plugins.

To load this plugin in your own diagrams.net application, you can

1. make it a default plugin: put the script file in the plugins folder and add it to the default plugin list. In this case, user can awalys find this plugin in the default plugin list.

   ```
   // plugin folder
   \drawio\src\main\webapp\plugins
   ```

2. add URL of your script file to Extra-plugins. It will disappear if the cache is cleared.

In this project, the plugin script is added as a default plugin. Its source code is bundled and minizied into one single file through webpack and put in plugin folder.

```
// source code of Ontopanel-frontend
\ontopanelSource

// bundled file of Ontopanel-frontend
\drawio\src\main\webapp\plugins\ontopanelPlugin\ontopanel.js
```

## Installation

### Clone the project

```
git clone https://github.com/yuechenbam/Ontopanel-frontend.git
```

### Add backend address:

```
// file location: ontopanelSource\vars.js
// change the host address below in the file to your own address.
export const hostAddress = "http://127.0.0.1:8000/";
```

### Install dependencies

```
npm install
```

### Run the app

```
// use webpack dev server
npm run start

// to build
npm run build
```

## Related repositories and links

[Ontopanel GithubPage repository with tutorials](https://github.com/yuechenbam/yuechenbam.github.io) - repository of Ontopanel online demo.

[Ontopanel online demo](https://yuechenbam.github.io/src/main/webapp/index.html) - diagrams.net, contains the Ontopanel plugin hosted on the GithubPage.

[Ontopanel-backend](https://github.com/yuechenbam/Ontopanel-backend) - Ontopanel's frontend source code.

## Contact

Yue Chen (yue.chen@bam.de)
