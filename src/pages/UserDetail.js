import React, { useEffect } from 'react';
import PageTitle from '../components/Typography/PageTitle';
import { Link } from 'react-router-dom';
import { Input, Label, Button } from '@windmill/react-ui';
import DefaultAvatar from '../assets/img/unnamed.png';
import { connect } from 'react-redux';
import { fetchUser } from '../actions';

function UserDetail(props) {
  useEffect(() => {
    props.fetchUser(props.match.params.id);
  }, []);

  if (!props.user) {
    return <div>Loading...</div>;
  }

  const { user } = props;

  return (
    <>
      <div className="flex justify-between items-center">
        <PageTitle>User Detail</PageTitle>
        <div>
          <Link to="/users">
            <Button>Back</Button>
          </Link>
        </div>
      </div>

      <div className="px-4 py-3 mb-8 bg-white rounded-lg shadow-md dark:bg-gray-800">
        <div className="flex mb-6">
          <div className="flex-shrink-0 flex justify-center w-64">
            <img
              className="mt-8 w-28 h-28 rounded-full"
              src={DefaultAvatar}
              alt="avatar"
            />
          </div>
          <div className="mt-8 mr-4 flex-1 w-full">
            <form>
              <Label>
                <span>Fullname</span>
                <Input
                  className="mt-1"
                  placeholder="Fullname"
                  defaultValue={user.name}
                  disabled
                />
              </Label>

              <Label className="mt-4">
                <span>Email</span>
                <Input
                  disabled
                  defaultValue={user.email}
                  className="mt-1"
                  placeholder="Email"
                  type="email"
                />
              </Label>

              <Label className="mt-4">
                <span>Phone Number</span>
                <Input
                  disabled
                  className="mt-1"
                  placeholder="Phone Number"
                  type="number"
                  defaultValue={user.phoneNumber}
                />
              </Label>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

const mapStateToProps = (state, ownProps) => {
  return {
    user: state.users[ownProps.match.params.id],
  };
};

export default connect(mapStateToProps, { fetchUser })(UserDetail);
