import React,{Component} from "react";
import styles from "./Layout.css"
import Aux from "../Aux/Aux";
import Toolbar from '../../components/Navigation/Toolbar/Toolbar';
import Sidedrawer from '../../components/Navigation/SideDrawer/SideDrawer';

// props.children allows us to simply use this layout component as a wrapper around the core content
// component we want to render to the screen.
class Layout extends Component {

  state = {
    showSideDrawer: false
  }

  sideDrawerCloseHander = () => {
    this.setState({showSideDrawer:false});
  }

  sideDrawerToogleHandler = () => {
    //  
    this.setState( (prevState) => {
      return { showSideDrawer: !prevState.showSideDrawer };
    });
  }

  render () {
    return (
    <Aux>
      <Toolbar drawerToogleClicked={this.sideDrawerToogleHandler} />
      <Sidedrawer 
      open={this.state.showSideDrawer} 
      closed={this.sideDrawerCloseHander} />
      <main className={styles.Content}>
        {this.props.children}
      </main>
      </Aux>
    );
  }

};

export default Layout;