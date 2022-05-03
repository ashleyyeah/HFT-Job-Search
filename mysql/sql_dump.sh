#!/bin/bash

mysql -u root -pvagrant <<_EOF_
CREATE database project;
_EOF_

mysql -u root -pvagrant < Dump20220502/project_routines.sql
mysql -u root -pvagrant project < Dump20220502/project_companies.sql
mysql -u root -pvagrant project < Dump20220502/project_roles.sql
mysql -u root -pvagrant project < Dump20220502/project_company_roles.sql
mysql -u root -pvagrant project < Dump20220502/project_company_role_specs.sql

echo "Finished creating MySQL schema and table"

