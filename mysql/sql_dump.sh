#!/bin/bash

mysql -u root -pvagrant <<_EOF_
CREATE database project;
_EOF_

mysql -u root -pvagrant < FinalDump/project_routines.sql
mysql -u root -pvagrant project < FinalDump/project_companies.sql
mysql -u root -pvagrant project < FinalDump/project_roles.sql
mysql -u root -pvagrant project < FinalDump/project_company_roles.sql
mysql -u root -pvagrant project < FinalDump/project_company_role_specs.sql
mysql -u root -pvagrant project < FinalDump/project_skills.sql
mysql -u root -pvagrant project < FinalDump/project_company_role_skills.sql

echo "Finished creating MySQL schema and table"

