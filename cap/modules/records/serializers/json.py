# -*- coding: utf-8 -*-
#
# This file is part of CERN Analysis Preservation Framework.
# Copyright (C) 2016 CERN.
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
"""CAP Basic Serializers."""

from __future__ import absolute_import, print_function

from invenio_pidstore.models import PersistentIdentifier
from invenio_records_rest.serializers.json import JSONSerializer

from cap.modules.records.utils import url_to_api_url


class RecordSerializer(JSONSerializer):
    """Serializer for records v1 in JSON."""
    def preprocess_search_hit(self, pid, record_hit, links_factory=None):
        """Fetch PID object for records retrievals from ES."""
        pid = PersistentIdentifier.get(pid_type=pid.pid_type,
                                       pid_value=pid.pid_value)

        result = super(RecordSerializer,
                       self).preprocess_search_hit(pid,
                                                   record_hit,
                                                   links_factory=links_factory)

        return result

    def serialize_search(self, pid_fetcher, search_result, links=None,
                         item_links_factory=None, **kwargs):
        """Serialize a search result.

        :param pid_fetcher: Persistent identifier fetcher.
        :param search_result: Elasticsearch search result.
        :param links: Dictionary of links to add to response.
        """
        links = {
            k: url_to_api_url(v)
            for k, v in links.items()
        } if links else {}

        return super().serialize_search(pid_fetcher,
                                        search_result,
                                        links=links,
                                        item_links_factory=item_links_factory)
