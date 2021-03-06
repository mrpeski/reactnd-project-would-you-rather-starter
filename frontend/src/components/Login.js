import React, { Component } from 'react'
import { connect } from 'react-redux'
import {Redirect, withRouter} from 'react-router-dom'
import { authedUser } from '../actions/authUser'




class Login extends Component {

    state = {
        value: "",
        doRedirect: false
    }

    componentDidMount () {
        const { authedUser } = this.props
        this.setState({
            value: authedUser ? authedUser : "sarahedo"
        })
    }

    redirectPath = () => {
        const locationState = this.props.location.state;
        const pathname = ( locationState && locationState.from && locationState.from.pathname );
        return pathname || '/'
    }

    handleChange = (e) => {
        this.setState({
            value: e.target.value
        })
    }

    handleLogin = (e) => {
        const {dispatch} = this.props;
        let { value } = this.state;

        dispatch(authedUser(value))

        this.setState(() => ({
            doRedirect: true
        }))
        
    }

    render() {
 
    const {users} = this.props;
    const { doRedirect } = this.state

    let userArr = [];

    for (let user in users) {
        userArr.push(users[user])
    }

    if(doRedirect) {
        return <Redirect to={this.redirectPath()} />
    }

    const UI = userArr ? 
    <div className="col-lg-5" style={{margin: "28px 0"}}>
            <h3 style={{padding:"28px 0", textAlign:"center",background:"#ffffff",borderRadius: "12px 12px 0 0", fontSize: 16, fontWeight: 600,
            margin: 0, borderBottom: "2px solid #d7d4d4"}}>
                    LOGIN AS
            </h3>
            <div style={{background:"#ffffff",borderRadius: "0 0 12px 12px", padding: "20px 40px", paddingBottom:40}}>
                <form onSubmit={this.handleLogin}>
                    <div className="form-group">
                    <select type="text" className="form-control" 
                            onChange={this.handleChange}
                            value={this.state.value}>
                        {
                            userArr.map((user) => (<option value={user.id} key={user.id}>{user.name}</option>))
                        }
                    </select>
                    </div>
                    <div className="col-lg-12" style={{display:"flex",justifyContent:"center",padding:20}}>
                        <button type="submit" className="btn btn-primary btn-lg">login</button>
                    </div>
                </form>
            </div>
        </div> : null

    return UI;
    }
}

function mapStateToProps({users, authedUser}){
    return { users, authedUser }
}

export default withRouter(connect(mapStateToProps)(Login));