import React, { useEffect } from 'react';
import PageTitle from '../components/Typography/PageTitle';
import { Link } from 'react-router-dom';
import { Input, HelperText, Label, Button } from '@windmill/react-ui';
import DefaultAvatar from '../assets/img/unnamed.png';
import { connect } from 'react-redux';
import { fetchAdmin } from '../actions';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';

const schema = yup
  .object({
    email: yup.string().email().required('Email is required'),
    name: yup.string().min(2).max(50).required('Fullname is required'),
    phoneNumber: yup.string().max(24).required('Phone number is required'),
    password: yup.string().min(8).max(16).required('Password is required'),
    confirmPassword: yup
      .string()
      .min(8)
      .max(16)
      .required('Conform password is required')
      .oneOf([yup.ref('password')], 'Password must match'),
  })
  .required();

function AdminDetail(props) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  useEffect(() => {
    props.fetchAdmin(props.match.params.id);
  }, []);

  function onSubmit(data) {
    console.log(data);
  }

  if (!props.admin) {
    return <div>Loading...</div>;
  }

  const { admin, isMyProfile } = props;

  return (
    <>
      <div className="flex justify-between items-center">
        <PageTitle>{isMyProfile ? 'Profile' : 'Admin Detail'}</PageTitle>
        <div>
          <Link to="/admins">
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
            <form onSubmit={handleSubmit(onSubmit)}>
              <Label>
                <span>Fullname</span>
                <Input
                  {...register('name')}
                  className="mt-1"
                  placeholder="Fullname"
                  defaultValue={admin.name}
                  disabled={!isMyProfile}
                  valid={errors.name === undefined}
                />
                <HelperText valid={false}>{errors.name?.message}</HelperText>
              </Label>

              <Label className="mt-4">
                <span>Email</span>
                <Input
                  {...register('email')}
                  disabled={!isMyProfile}
                  defaultValue={admin.email}
                  className="mt-1"
                  placeholder="Email"
                  type="email"
                  valid={errors.email === undefined}
                />
                <HelperText valid={false}>{errors.email?.message}</HelperText>
              </Label>

              <Label className="mt-4">
                <span>Phone Number</span>
                <Input
                  {...register('phoneNumber')}
                  disabled={!isMyProfile}
                  className="mt-1"
                  placeholder="Phone Number"
                  type="number"
                  defaultValue={admin.phoneNumber}
                  valid={errors.phoneNumber === undefined}
                />
                <HelperText valid={false}>
                  {errors.phoneNumber?.message}
                </HelperText>
              </Label>

              {/* <div className="flex justify-center">
                <Button className="my-6" type="submit">
                  Update
                </Button>
              </div> */}
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

const mapStateToProps = (state, ownProps) => {
  return {
    admin: state.admins[ownProps.match.params.id],
    isMyProfile:
      ownProps.match.params.id.toString() === state.auth.user._id.toString(),
  };
};

export default connect(mapStateToProps, { fetchAdmin })(AdminDetail);
