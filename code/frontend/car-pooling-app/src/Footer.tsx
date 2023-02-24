// Copyright (c) Microsoft. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import * as React from "react";
import 'bootstrap/dist/css/bootstrap.css';

export class Footer extends React.Component {
  render() {
    return (
      <footer className="footer_wrapper">
        <div className="top_footer_section">
        <div className="container-fluid footer">
          <div className="row">
            <div className="col-md-12">
              <ul className="pull-right list-unstyled">
                <li>
                    {/* <a href="">{Resources.Footer.ContactUs}</a> */}
                    Contact us at (123) 456 7890!
                </li>
                <li>
                    © CarPool App {new Date().getFullYear()}
                </li>
              </ul>
            </div>
          </div>
          </div>
        </div>
      </footer>
    )
  }
}
