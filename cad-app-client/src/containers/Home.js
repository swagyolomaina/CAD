import React, {Component} from 'react';
import './Home.css';
import {PageHeader, ListGroup, ListGroupItem} from 'react-bootstrap';
import {API} from 'aws-amplify';
import {LinkContainer} from "react-router-bootstrap";


export default class Home extends Component {
    constructor(props) {
        super(props);
    
        this.state = {
          isLoading: true,
          projects: []
        };
      }

      async componentDidMount() {
        if (!this.props.isAuthenticated) {
          return;
        }
      
        try {
          const projects = await this.projects();
          this.setState({projects});
        } catch (e) {
          alert(e);
        }
      
        this.setState({isLoading: false});
      }
      
      projects() {
        return API.get("projects", "/projects");
      }
    
      renderProjectsList(projects) {
        return [{}].concat(projects).map(
            (project, i) =>
              i !== 0
                ? <LinkContainer
                    key={project.tableId}
                    to={`/projects/${project.tableId}`}
                  >
                    <ListGroupItem header={project.content.trim().split("\n")[0]}>
                      {"Created: " + new Date(project.createdAt).toLocaleString()}
                    </ListGroupItem>
                  </LinkContainer>
                : <LinkContainer
                    key="new"
                    to="/projects/new"
                  >
                    <ListGroupItem>
                      <h4>
                        <b>{"\uFF0B"}</b> Create a new project
                      </h4>
                    </ListGroupItem>
                  </LinkContainer>
          );
      }
    
      renderLander() {
        return (
          <div className="lander">
            <h1>SIO</h1>
            <p>Sort It Out</p>
          </div>
        );
      }
    
      renderProjects() {
        return (
          <div className="projects">
            <PageHeader>Projects</PageHeader>
            <ListGroup>
              {!this.state.isLoading && this.renderProjectsList(this.state.projects)}
            </ListGroup>
          </div>
        );
      }
    
      render() {
        return (
          <div className="Home">
            {this.props.isAuthenticated ? this.renderProjects() : this.renderLander()}
          </div>
        );
    }
}