import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { withRouter } from "react-router";

import Box from "grommet/components/Box";
import Sidebar from "grommet/components/Sidebar";
import Button from "grommet/components/Button";
import Heading from "grommet/components/Heading";
import Header from "grommet/components/Header";
import Section from "grommet/components/Section";
import LoginForm from "grommet/components/LoginForm";
import Anchor from "grommet/components/Anchor";
import Paragraph from "grommet/components/Paragraph";
import Image from "grommet/components/Image";
import logo from "../../../images/cap.png";
import github from "../../../images/github.svg";
import gitlab from "../../../images/gitlab.png";
import docker from "../../../images/docker.png";
import zenodo from "../../../images/zenodo.png";
import ror from "../../../images/ror.svg";
import reana from "../../../images/reana.png";

import Spinning from "grommet/components/icons/Spinning";
import Update from "grommet/components/icons/base/Update";
import Database from "grommet/components/icons/base/Database";
import Group from "grommet/components/icons/base/Group";

import { loginLocalUser } from "../../actions/auth";

import LoginIcon from "grommet/components/icons/base/Login";
import Descriptions from "./Descriptions";

class WelcomePage extends React.Component {
  constructor(props) {
    super(props);
  }

  onFormSubmit = formData => {
    let {
      location: { state: { next: next = "/" } = {} }
    } = this.props.history;
    formData["next"] = next;

    this.props.loginLocalUser(formData);
  };
  render() {
    return (
      <Box direction="column" full>
        <Box align="center" colorIndex="brand" pad="large" justify="center">
          <Box wrap={true} pad="medium">
            <Image size="large" src={logo} />
            {/* <Heading 
                  tag="h2" 
                  align="center"
                  margin="large"
                  >
                    A platform to <Descriptions/>
                </Heading> */}
            <Heading tag="h3" align="center">
              A service for scientific presentation, reuse and collaboration
            </Heading>
            {/* <Heading tag="h2">
                  Welcome to the CERN Analysis Preservation Portal.
                </Heading>
                <Heading tag="h3">
                  Our mission is to preserve physics analyses to facilitate
                  their future reuse
                </Heading>
                <Paragraph>
                  <Anchor path="/about">
                    Do you want to know more? Check out what the service is
                    about
                  </Anchor>
                </Paragraph> */}
            <Box justify="center" align="center" margin="medium">
              <Header
                pad="small"
                justify="end"
                alignContent="end"
                align="end"
                textAlign="right"
              >
                {this.props.authLoading ? <Spinning /> : null}
              </Header>
              <Box justify="center">
                <Button
                  icon={<LoginIcon />}
                  label="Log in with CERN"
                  href="/api/oauth/login/cern"
                />
                {this.props.authError ? (
                  <Box
                    colorIndex="critical"
                    margin={{ top: "small" }}
                    pad="small"
                  >
                    {this.props.authError}
                  </Box>
                ) : null}
                {/* {process.env.NODE_ENV === "development" ? (
                <LoginForm
                  usernameType="email"
                  defaultValues={{ username: "info@inveniosoftware.org" }}
                  onSubmit={this.onFormSubmit}
                />
              ) : null} */}
              </Box>
            </Box>
          </Box>
        </Box>
        <Box colorIndex="light-2" pad="large" align="center" justify="center">
          <Heading>Why CERN Analysis Preservation ?</Heading>
          <Paragraph margin={{ vertical: "medium" }}>
            CAP provides an integrated platform that allows researchers to
            preserve and document the various materials produced in the process
            of their research and experimentation (datasets, code,
            documentation) so that they are reusable and understandable in the
            future. By using this tool, researchers ensure these outputs are
            preserved, findable and accessible by their collaborators.
          </Paragraph>
        </Box>

        <Box
          direction="row"
          colorIndex="brand"
          align="center"
          justify="center"
          pad="large"
        >
          <Box size="medium" direction="row">
            <Database size="medium" />
            <Box direction="column" margin={{ horizontal: "small" }}>
              <Heading tag="h3">Preserve</Heading>
              <Paragraph margin="none">
                Researchers can save their materials (code, data, docs), and
                enrich them with metadata from integrated services (ORCID, ROR),
                providing an overview of their experiment and results.
              </Paragraph>
            </Box>
          </Box>
          <Box size="medium" direction="row">
            <Update size="medium" />
            <Box direction="column" margin={{ horizontal: "small" }}>
              <Heading tag="h3">Reuse</Heading>
              <Paragraph margin="none">
                By integrating workflows and git repositories, researchers can
                rerun their experiments and save the results remotely, in
                self-contained environments.
              </Paragraph>
            </Box>
          </Box>
          <Box size="medium" direction="row">
            <Group size="medium" />
            <Box direction="column" margin={{ horizontal: "small" }}>
              <Heading tag="h3">Collaborate</Heading>
              <Paragraph margin="none">
                Through CAP, researchers can give collaborators access to their
                analyses, resulting in increased efficiency, better
                communication and lessened duplication of work.
              </Paragraph>
            </Box>
          </Box>
        </Box>
        <Box justify="start" pad="small" align="center">
          <Section>
            <Heading align="center" margin="medium">
              Integrations & Services
            </Heading>
            <Box direction="row">
              <Image size="small" src={github} />
              <Image size="small" src={gitlab} />
            </Box>
            <Box direction="row" margin={{ vertical: "medium" }}>
              <Image size="small" src={zenodo} />
              <Image size="small" src={reana} />
              <Image size="small" src={ror} />
            </Box>
          </Section>
        </Box>
      </Box>

      // <Box
      //   direction="column">
      //     <Box
      //     flex={true}
      //     justify="center"
      //     align="center"
      //   >
      //     <Section>
      //       <Box flex={true}>
      //         <Box flex={true} wrap={true} pad="small" size="large">
      //           <Image
      //             size="large"
      //             src={logo}
      //           />
      //           {/* <Heading
      //             tag="h2"
      //             align="center"
      //             margin="large"
      //             >
      //               A platform to <Descriptions/>
      //           </Heading> */}
      //           <Heading
      //             tag="h3"
      //             align="center"
      //           >
      //             A service for scientific presentation, reuse and collaboration
      //           </Heading>
      //           {/* <Heading tag="h2">
      //             Welcome to the CERN Analysis Preservation Portal.
      //           </Heading>
      //           <Heading tag="h3">
      //             Our mission is to preserve physics analyses to facilitate
      //             their future reuse
      //           </Heading>
      //           <Paragraph>
      //             <Anchor path="/about">
      //               Do you want to know more? Check out what the service is
      //               about
      //             </Anchor>
      //           </Paragraph> */}
      //         </Box>
      //       </Box>
      //     </Section>
      //     <Section>
      //       <Box flex={true}>
      //         <Box flex={true} wrap={true} justify="center" align="center" size="xxxlarge">
      //           <Heading>
      //             Why CERN Analysis Preservation ?
      //           </Heading>
      //           <Paragraph margin={{vertical:"medium"}} align="center" textAlign="justify">
      //            CAP provides an integrated platform that allows researchers to preserve and document the various materials produced in the process of their research and experimentation (datasets, code, documentation) so that they are reusable and understandable in the future. By using this tool, researchers ensure these outputs are preserved, findable and accessible by their collaborators.
      //           </Paragraph>
      //         </Box>
      //       </Box>
      //     </Section>
      //   </Box>
      //   {/* <Box
      //     flex={true}
      //     justify="start"
      //     pad="small"
      //     align="center"
      //   >
      //     <Section>
      //       <Box flex={true}>
      //         <Box flex={true} wrap={true} justify="center" align="center" size="xxxlarge">
      //           <Heading>
      //             Why CERN Analysis Preservation ?
      //           </Heading>
      //           <Paragraph margin={{vertical:"medium"}} align="center" textAlign="justify">
      //            CAP provides an integrated platform that allows researchers to preserve and document the various materials produced in the process of their research and experimentation (datasets, code, documentation) so that they are reusable and understandable in the future. By using this tool, researchers ensure these outputs are preserved, findable and accessible by their collaborators.
      //           </Paragraph>
      //         </Box>
      //       </Box>
      //     </Section>
      //   </Box> */}
      //   <Box
      //     justify="start"
      //     pad="small"
      //     align="center"
      //   >
      //     <Section>
      //       <Box>
      //         <Box  wrap={true} justify="center" align="start" direction="row">
      //         <Box size="medium" direction="row">
      //             <Database size="medium"/>
      //             <Box direction="column" margin={{horizontal:'small'}}>
      //               <Heading tag="h3">
      //                 Preserve
      //               </Heading>
      //               <Paragraph margin="none">
      //               Researchers can save their materials (code, data, docs), and enrich them with metadata from integrated services (ORCID, ROR), providing an overview of their experiment and results.
      //               </Paragraph>
      //             </Box>
      //           </Box>
      //           <Box size="medium" direction="row">
      //             <Update size="medium"/>
      //             <Box direction="column" margin={{horizontal:'small'}}>
      //               <Heading tag="h3">
      //                 Reuse
      //               </Heading>
      //               <Paragraph margin="none">
      //               By integrating workflows and git repositories, researchers can rerun their experiments and save the results remotely, in self-contained environments.
      //               </Paragraph>
      //             </Box>
      //           </Box>
      //           <Box size="medium" direction="row">
      //             <Group size="medium"/>
      //             <Box direction="column" margin={{horizontal:'small'}}>
      //               <Heading tag="h3">
      //                 Collaborate
      //               </Heading>
      //               <Paragraph margin="none">
      //               Through CAP, researchers can give collaborators access to their analyses, resulting in increased efficiency, better communication and lessened duplication of work.
      //               </Paragraph>
      //             </Box>
      //           </Box>
      //         </Box>
      //       </Box>
      //     </Section>
      //   </Box>
      //   <Box
      //     justify="start"
      //     pad="small"
      //     align="center"
      //   >
      //     <Section>
      //       <Heading tag="h2" align="center" margin="medium">
      //           Integrations & Services
      //       </Heading>
      //       <Box direction="row">
      //         <Image size="small" src={github}/>
      //         <Image size="small" src={gitlab}/>
      //         <Image size="small" src={docker}/>
      //       </Box>
      //       <Box direction="row">
      //         <Image size="small" src={zenodo}/>
      //         <Image size="small" src={reana}/>
      //         <Image size="small" src={ror}/>
      //       </Box>
      //     </Section>
      //   </Box>
      // </Box>
      // // <Box flex={true} direction="row">
      // //   <Box
      // //     flex={true}
      // //     colorIndex="neutral-1-a"
      // //     justify="center"
      // //     align="center"
      // //   >
      // //     <Section>
      // //       <Box flex={true}>
      // //         <Box flex={true} wrap={true} pad="small" size="large">
      // //           <Heading tag="h2">
      // //             Welcome to the CERN Analysis Preservation Portal.
      // //           </Heading>
      // //           <Heading tag="h3">
      // //             Our mission is to preserve physics analyses to facilitate
      // //             their future reuse
      // //           </Heading>
      // //           <Paragraph>
      // //             <Anchor path="/about">
      // //               Do you want to know more? Check out what the service is
      // //               about
      // //             </Anchor>
      // //           </Paragraph>
      // //         </Box>
      // //       </Box>
      // //     </Section>
      // //   </Box>
      // //   <Sidebar size="medium" justify="center" full={true}>
      // //     <Box flex={true} justify="center" margin="medium">
      // //       <Header
      // //         pad="small"
      // //         justify="end"
      // //         alignContent="end"
      // //         align="end"
      // //         textAlign="right"
      // //       >
      // //         {this.props.authLoading ? <Spinning /> : null}
      // //       </Header>
      // //       <Box flex={true} justify="center">
      // //         <Button
      // //           icon={<LoginIcon />}
      // //           label="Log in with CERN"
      // //           href="/api/oauth/login/cern"
      // //         />
      // //         {this.props.authError ? (
      // //           <Box
      // //             colorIndex="critical"
      // //             margin={{ top: "small" }}
      // //             pad="small"
      // //           >
      // //             {this.props.authError}
      // //           </Box>
      // //         ) : null}
      // //         {process.env.NODE_ENV === "development" ? (
      // //           <LoginForm
      // //             usernameType="email"
      // //             defaultValues={{ username: "info@inveniosoftware.org" }}
      // //             onSubmit={this.onFormSubmit}
      // //           />
      // //         ) : null}
      // //       </Box>
      // //     </Box>
      // //   </Sidebar>
      // // </Box>
    );
  }
}

WelcomePage.propTypes = {
  isLoggedIn: PropTypes.bool.isRequired,
  loginLocalUser: PropTypes.func.isRequired,
  authLoading: PropTypes.bool.isRequired,
  authError: PropTypes.object,
  history: PropTypes.object
};

function mapStateToProps(state) {
  return {
    isLoggedIn: state.auth.get("isLoggedIn"),
    authLoading: state.auth.get("loading"),
    authError: state.auth.get("error")
  };
}

function mapDispatchToProps(dispatch) {
  return {
    loginLocalUser: data => dispatch(loginLocalUser(data))
  };
}

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(WelcomePage)
);
