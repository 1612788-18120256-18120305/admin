import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import PageTitle from '../components/Typography/PageTitle';
import Modals from '../components/Modals/Modals';
import { fetchAdmins } from '../actions';
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
import { EditIcon, TrashIcon } from '../icons';

function AdminPage(props) {
  const [isOpenModal, setOpenModal] = useState(false);
  const [pageTable, setPageTable] = useState(1);

  useEffect(() => {
    props.fetchAdmins();
  }, []);

  // pagination setup
  const resultsPerPage = 10;
  const totalResults = props.admins.length;

  let dataTable = props.admins.slice(
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

  const modalActions = (
    <>
      <div className="hidden sm:block">
        <Button layout="outline" onClick={handleCloseModal}>
          Cancel
        </Button>
      </div>
      <div className="hidden sm:block">
        <Button>Accept</Button>
      </div>
      <div className="block w-full sm:hidden">
        <Button block size="large" layout="outline" onClick={handleCloseModal}>
          Cancel
        </Button>
      </div>
      <div className="block w-full sm:hidden">
        <Button block size="large">
          Accept
        </Button>
      </div>
    </>
  );

  return (
    <>
      <div className="flex justify-between">
        <PageTitle>Admins</PageTitle>
        <div className="px-6 my-6">
          <Link to="/admins/create">
            <Button>
              Create account
              <span className="ml-2" aria-hidden="true">
                +
              </span>
            </Button>
          </Link>
        </div>
      </div>
      {/* <SectionTitle>Table with actions</SectionTitle> */}
      <TableContainer className="mb-8">
        <Table>
          <TableHeader>
            <tr>
              <TableCell>Admin</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Phone Number</TableCell>
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
                      <p className="text-xs text-gray-600 dark:text-gray-400">
                        Super admin
                      </p>
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  <span className="text-sm">{user.email}</span>
                </TableCell>
                <TableCell>
                  <Badge type={user.status}>{user.phoneNumber}</Badge>
                </TableCell>
                <TableCell>
                  <span className="text-sm">
                    {new Date(user.createdAt).toLocaleDateString()}
                  </span>
                </TableCell>
                <TableCell>
                  <div className="flex justify-center items-center space-x-4">
                    <Link to={`/admins/${user._id}`}>
                      <Button layout="link" size="icon" aria-label="Edit">
                        <EditIcon className="w-5 h-5" aria-hidden="true" />
                      </Button>
                    </Link>
                    {/* <Button
                      layout="link"
                      size="icon"
                      aria-label="Delete"
                      onClick={() => setOpenModal(true)}
                    >
                      <TrashIcon className="w-5 h-5" aria-hidden="true" />
                    </Button> */}
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
        header="Create admin"
        actions={modalActions}
      >
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Officiis optio
        voluptatum, deleniti assumenda, dolorum enim, at aspernatur ratione
        blanditiis voluptas deserunt ex. Voluptate sit reiciendis beatae.
        Praesentium repellendus culpa quia.
      </Modals>
    </>
  );
}

const mapStateToProps = (state) => {
  return {
    admins: Object.values(state.admins),
  };
};

export default connect(mapStateToProps, { fetchAdmins })(AdminPage);
