import React from "react";
import { Media, Image, Accordion, Button } from "react-bootstrap";

export default function EventDisplay(props) {
  return (
    <>
      <div className="container-fluid">
        <div className="d-flex flex-column flex-md-row py-5 container">
          <div className="container d-flex flex-column col-12 col-md-8">
            <div className="">
              <h2 className="">Sample blog post</h2>
              <p className="">
                January 1, 2014 by <a href="#">Mark</a>
              </p>

              <p>
                Cum sociis natoque penatibus et magnis dis parturient montes,
                nascetur ridiculus mus. Aenean eu leo quam. Pellentesque ornare
                sem lacinia quam venenatis vestibulum. Sed posuere consectetur
                est at lobortis. Cras mattis consectetur purus sit amet
                fermentum. Curabitur blandit tempus porttitor. Nullam quis risus
                eget urna mollis ornare vel eu leo. Nullam id dolor id nibh
                ultricies vehicula ut id elit.
              </p>
              <hr></hr>

              <div className="comments">
                <Accordion>
                  <Accordion.Toggle
                    as={Button}
                    variant="outline-success"
                    eventKey="0"
                  >
                    Comments
                  </Accordion.Toggle>

                  <p></p>
                  <Accordion.Collapse eventKey="0">
                    <Media>
                      <Image
                        roundedCircle
                        width={64}
                        height={64}
                        className="mr-3"
                        src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSHSYGuMbkmv2fZQ4tdxNiSzsVTNgK_fg5iWsQanic-26hGXW6M_Q&s"
                        alt="profile pic"
                      />
                      <Media.Body>
                        <h5>Media Heading</h5>
                        <p>
                          Cras sit amet nibh libero, in gravida nulla. Nulla vel
                          metus scelerisque ante sollicitudin commodo. Cras
                          purus odio, vestibulum in vulputate at, tempus viverra
                          turpis. Fusce condimentum nunc ac nisi vulputate
                          fringilla. Donec lacinia congue felis in faucibus.
                        </p>

                        <Media>
                          <Image
                            roundedCircle
                            width={64}
                            height={64}
                            className="mr-3"
                            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSHSYGuMbkmv2fZQ4tdxNiSzsVTNgK_fg5iWsQanic-26hGXW6M_Q&s"
                            alt="profile pic"
                          />
                          <Media.Body>
                            <h5>Media Heading</h5>
                            <p>
                              Cras sit amet nibh libero, in gravida nulla. Nulla
                              vel metus scelerisque ante sollicitudin commodo.
                              Cras purus odio, vestibulum in vulputate at,
                              tempus viverra turpis. Fusce condimentum nunc ac
                              nisi vulputate fringilla. Donec lacinia congue
                              felis in faucibus.
                            </p>
                          </Media.Body>
                        </Media>
                      </Media.Body>
                    </Media>
                  </Accordion.Collapse>
                </Accordion>
              </div>
            </div>
          </div>

          <div className="col-12 col-md-4">
            <div className="p-3 bg-light rounded-custom">
              <h4 className="font-italic">About</h4>
              <p className="mb-0">
                Etiam porta <em>sem malesuada magna</em> mollis euismod. Cras
                mattis consectetur purus sit amet fermentum. Aenean lacinia
                bibendum nulla sed consectetur.
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
