#!/bin/bash

mysql -u root -pvagrant <<_EOF_
CREATE database project;
_EOF_

mysql -u root -pvagrant < Dump20220414/project_routines.sql
mysql -u root -pvagrant project < Dump20220414/project_companies.sql

echo "Finished creating MySQL schema and table"

