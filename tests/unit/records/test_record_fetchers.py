# -*- coding: utf-8 -*-
#
# This file is part of CERN Analysis Preservation Framework.
# Copyright (C) 2018 CERN.
#
# CERN Analysis Preservation Framework is free software; you can redistribute
# it and/or modify it under the terms of the GNU General Public License as
# published by the Free Software Foundation; either version 2 of the
# License, or (at your option) any later version.
#
# CERN Analysis Preservation Framework is distributed in the hope that it will
# be useful, but WITHOUT ANY WARRANTY; without even the implied warranty of
# MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the GNU
# General Public License for more details.
#
# You should have received a copy of the GNU General Public License
# along with CERN Analysis Preservation Framework; if not, write to the
# Free Software Foundation, Inc., 59 Temple Place, Suite 330, Boston,
# MA 02111-1307, USA.
#
# In applying this license, CERN does not
# waive the privileges and immunities granted to it by virtue of its status
# as an Intergovernmental Organization or submit itself to any jurisdiction.
# or submit itself to any jurisdiction.


import uuid

from cap.modules.records.minters import cap_record_minter
from cap.modules.records.fetchers import cap_record_fetcher


def test_record_fetcher(app, db, create_deposit, users):
    with app.app_context():
        deposit = create_deposit(users['cms_user'], 'cms-analysis-v0.0.1')
        published_deposit = deposit.publish()

        rec_uuid = uuid.uuid4()

        fetcher_pid = cap_record_fetcher(rec_uuid, published_deposit)

        assert published_deposit['_deposit']['pid']['value'] == fetcher_pid.pid_value
        assert fetcher_pid.pid_type == fetcher_pid.provider.pid_type
        assert fetcher_pid.pid_type == 'recid'
