/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import Link from 'next/link';
import {
  Navbar, //
  Container,
  Nav,
  Button,
  Image,
} from 'react-bootstrap';
import { signOut } from '../utils/auth';

export default function NavBar() {
  return (
    <Navbar className="navbar" collapseOnSelect expand="lg">
      <Container>
        <Link passHref href="/">
          <Image src="https://i.ibb.co/n3yTtgB/E.jpg" className="navImage" />
        </Link>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            {/* CLOSE NAVBAR ON LINK SELECTION: https://stackoverflow.com/questions/72813635/collapse-on-select-react-bootstrap-navbar-with-nextjs-not-working */}
            <Link passHref href="/my-projects">
              <Nav.Link className="navHov">My Projects</Nav.Link>
            </Link>
            <Link passHref href="/all-producers">
              <Nav.Link className="navHov">Producers</Nav.Link>
            </Link>
            <Link passHref href="/services">
              <Nav.Link className="navHov">Services</Nav.Link>
            </Link>
            <Link passHref href="/profile">
              <Nav.Link className="navHov">My Profile</Nav.Link>
            </Link>
            <Button
              className="heading signOut"
              onClick={signOut}
            >
              Sign Out
            </Button>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
