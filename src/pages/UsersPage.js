import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import PageTitle from '../components/Typography/PageTitle';
import Modals from '../components/Modals/Modals';
import { fetchUsers, banUser, unLockUser } from '../actions';
import { Link } from 'react-router-dom';
//import SectionTitle from '../components/Typography/SectionTitle';
import {
  Table,
  TableHeader,
  TableCell,
  TableBody,
  TableRow,
  TableFooter,
  TableContainer,
  Badge,
  Avatar,
  Button,
  Pagination,
} from '@windmill/react-ui';
import DefaultAvatar from '../assets/img/unnamed.png';
import { EditIcon, LockIcon, UnLockIcon } from '../icons';

function UsersPage(props) {
  const [selectedUser, setSelectedUser] = useState(null);
  const [isOpenModal, setOpenModal] = useState(false);
  const [isOpenUnlockModal, setOpenUnlockModal] = useState(false);
  const [pageTable, setPageTable] = useState(1);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    props.fetchUsers();
  }, []);

  if (!props.users) {
    return <div>Loading...</div>;
  }

  // pagination setup
  const resultsPerPage = 10;
  const totalResults = props.users.length;

  let dataTable = props.users.slice(
    (pageTable - 1) * resultsPerPage,
    pageTable * resultsPerPage
  );

  // pagination change control
  function onPageChangeTable2(p) {
    setPageTable(p);
  }

  function handleCloseModal() {
    setOpenModal(false);
  }

  function handleShowModal(user) {
    setSelectedUser(user);
    setOpenModal(true);
  }

  function handleShowUnLockModal(user) {
    setSelectedUser(user);
    setOpenUnlockModal(true);
  }

  function handleCloseUnLockModal() {
    setOpenUnlockModal(false);
  }

  function handleBanUser() {
    setIsLoading(true);
    props.banUser(selectedUser._id, setIsLoading);
    setOpenModal(false);
  }

  function handleUnLockUser() {
    setIsLoading(true);
    props.unLockUser(selectedUser._id, setIsLoading);
    setOpenUnlockModal(false);
  }

  const modalActions = (
    <>
      <div className="hidden sm:block">
        <Button layout="outline" onClick={handleCloseModal}>
          Cancel
        </Button>
      </div>
      <div className="hidden sm:block">
        <Button onClick={handleBanUser}>Accept</Button>
      </div>
      <div className="block w-full sm:hidden">
        <Button block size="large" layout="outline" onClick={handleCloseModal}>
          Cancel
        </Button>
      </div>
      <div className="block w-full sm:hidden">
        <Button onClick={handleBanUser} block size="large">
          Accept
        </Button>
      </div>
    </>
  );

  const modalUnlockActions = (
    <>
      <div className="hidden sm:block">
        <Button layout="outline" onClick={handleCloseUnLockModal}>
          Cancel
        </Button>
      </div>
      <div className="hidden sm:block">
        <Button onClick={handleUnLockUser}>Accept</Button>
      </div>
      <div className="block w-full sm:hidden">
        <Button
          block
          size="large"
          layout="outline"
          onClick={handleCloseUnLockModal}
        >
          Cancel
        </Button>
      </div>
      <div className="block w-full sm:hidden">
        <Button onClick={handleUnLockUser} block size="large">
          Accept
        </Button>
      </div>
    </>
  );

  return (
    <>
      <div className="flex justify-between">
        <PageTitle>Users</PageTitle>
        {/* <div className="px-6 my-6">
          <Link to="/admins/create">
            <Button>
              Create account
              <span className="ml-2" aria-hidden="true">
                +
              </span>
            </Button>
          </Link>
        </div> */}
      </div>
      {/* <SectionTitle>Table with actions</SectionTitle> */}
      <TableContainer className="mb-8">
        <Table>
          <TableHeader>
            <tr>
              <TableCell>User</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>StudentId</TableCell>
              <TableCell>Date Created</TableCell>
              <TableCell>Actions</TableCell>
            </tr>
          </TableHeader>
          <TableBody>
            {dataTable.map((user, i) => (
              <TableRow key={i}>
                <TableCell>
                  <div className="flex items-center text-sm">
                    <Avatar
                      className="hidden mr-3 md:block"
                      src={DefaultAvatar}
                      alt="User avatar"
                    />
                    <div>
                      <p className="font-semibold">{user.name}</p>
                      <p className="text-xs text-gray-600 dark:text-gray-400"></p>
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  <span className="text-sm">{user.email}</span>
                </TableCell>
                <TableCell>
                  {isLoading && selectedUser._id === user._id ? (
                    <div className="flex justify-center items-center">
                      <div
                        className="spinner-border animate-spin inline-block w-5 h-5 border-4 rounded-full text-blue-300"
                        role="status"
                      >
                        <span className="visually-hidden">Loading...</span>
                      </div>
                    </div>
                  ) : (
                    <Badge type={user.status === 1 ? 'success' : 'danger'}>
                      {user.status === 1 ? 'Active' : 'Banned'}
                    </Badge>
                  )}
                </TableCell>
                <TableCell>
                  <span className="text-sm">{user.student}</span>
                </TableCell>
                <TableCell>
                  <span className="text-sm">
                    {new Date(user.createdAt).toLocaleDateString()}
                  </span>
                </TableCell>
                <TableCell>
                  <div className="flex justify-center items-center space-x-4">
                    <Link to={`/users/${user._id}`}>
                      <Button layout="link" size="icon" aria-label="Edit">
                        <EditIcon className="w-5 h-5" aria-hidden="true" />
                      </Button>
                    </Link>
                    {user.status === 0 ? (
                      <Button
                        layout="link"
                        size="icon"
                        aria-label="Delete"
                        onClick={() => handleShowUnLockModal(user)}
                      >
                        <UnLockIcon
                          className="w-5 h-5 text-red-800"
                          aria-hidden="true"
                        />
                      </Button>
                    ) : (
                      <Button
                        layout="link"
                        size="icon"
                        aria-label="Delete"
                        onClick={() => handleShowModal(user)}
                      >
                        <LockIcon
                          className="w-5 h-5 text-red-800"
                          aria-hidden="true"
                        />
                      </Button>
                    )}
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <TableFooter>
          <Pagination
            totalResults={totalResults}
            resultsPerPage={resultsPerPage}
            onChange={onPageChangeTable2}
            label="Table navigation"
          />
        </TableFooter>
      </TableContainer>
      <Modals
        isOpenModal={isOpenModal}
        setClose={() => setOpenModal(false)}
        header="Warning"
        actions={modalActions}
      >
        {selectedUser && `Do you want to ban ${selectedUser.name} ?`}
      </Modals>
      <Modals
        isOpenModal={isOpenUnlockModal}
        setClose={() => setOpenUnlockModal(false)}
        header="Warning"
        actions={modalUnlockActions}
      >
        {selectedUser && `Do you want to unlock ${selectedUser.name} ?`}
      </Modals>
    </>
  );
}

const mapStateToProps = (state) => {
  return {
    users: Object.values(state.users),
  };
};

export default connect(mapStateToProps, { fetchUsers, banUser, unLockUser })(
  UsersPage
);
