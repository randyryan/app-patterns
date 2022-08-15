import React, { useState } from "react";
import { useQuery, gql } from '@apollo/client';

import { DataTableSkeleton, Link, Pagination } from "carbon-components-react";

import RepoTable from "./RepoTable";

const headers = [
  {
    key: 'name',
    header: 'Name',
  },
  {
    key: 'createdAt',
    header: 'Created',
  },
  {
    key: 'updatedAt',
    header: 'Updated',
  },
  {
    key: 'issueCount',
    header: 'Open Issues',
  },
  {
    key: 'stars',
    header: 'Stars',
  },
  {
    key: 'links',
    header: 'Links',
  },
];

const LinkList = ({ url, homepageUrl }: { url: string, homepageUrl: string }) => (
  <ul style={{ display: 'flex' }}>
    <li>
      <Link href={url}>GitHub</Link>
    </li>
    {homepageUrl && (
      <li>
        <span>&nbsp;|&nbsp;</span>
        <Link href={homepageUrl}>Homepage</Link>
      </li>
    )}
  </ul>
);

const REPO_QUERY = gql`
  query REPO_QUERY {
    # Let's use carbon as our organization
    organization(login: "carbon-design-system") {
      # We'll grab all the repositories in one go. To load more resources
      # continuously, see the advanced topics.
      repositories(first: 75, orderBy: { field: UPDATED_AT, direction: DESC }) {
        totalCount
        nodes {
          url
          homepageUrl
          issues(filterBy: { states: OPEN }) {
            totalCount
          }
          stargazers {
            totalCount
          }
          releases(first: 1) {
            totalCount
            nodes {
              name
            }
          }
          name
          updatedAt
          createdAt
          description
          id
        }
      }
    }
  }
`;

const getRowItems = (rows: any) =>
  rows.map((row: any) => ({
    ...row,
    key: row.id,
    stars: row.stargazers.totalCount,
    issueCount: row.issues.totalCount,
    createdAt: new Date(row.createdAt).toLocaleDateString(),
    updatedAt: new Date(row.updatedAt).toLocaleDateString(),
    links: <LinkList url={row.url} homepageUrl={row.homepageUrl} />,
  }));

const RepoQuery = (props: any) => {
  const {
    loading, error, data,
    totalItems, setTotalItems,
    firstRowIndex, setFirstRowIndex,
    currentPageSize, setCurrentPageSize
  } = props;

  if (loading) {
    return (
      <DataTableSkeleton
        columnCount={headers.length + 1}
        rowCount={10}
        headers={headers}/>
    );
  }

  if (error) {
    return <p>`Error! ${error.message}`</p>;
  }

  const { repositories } = data.organization;
  setTotalItems(repositories.totalCount);
  const rows = getRowItems(repositories.nodes);

  return (
    <>
      <RepoTable headers={headers} rows={rows.slice(firstRowIndex, firstRowIndex + currentPageSize)} />
      <Pagination
          totalItems={totalItems}
          backwardText="Previous page"
          forwardText="Next page"
          pageSize={currentPageSize}
          pageSizes={[5, 10, 15, 25]}
          itemsPerPageText="Items per page"
          onChange={({ page, pageSize }) => {
            if (pageSize !== currentPageSize) {
              setCurrentPageSize(pageSize);
            }
            setFirstRowIndex(pageSize * (page - 1));
          }}
        />
    </>
  );
};

const RepoPage = () => {
  const { loading, error, data } = useQuery(REPO_QUERY);
  const [totalItems, setTotalItems] = useState(0);
  const [firstRowIndex, setFirstRowIndex] = useState(0);
  const [currentPageSize, setCurrentPageSize] = useState(10);

  const queryProps = {
    loading, error, data,
    totalItems, setTotalItems,
    firstRowIndex, setFirstRowIndex,
    currentPageSize, setCurrentPageSize
  };

  return (
    <div className="bx--grid bx--grid--full-width bx--grid--no-gutter repo-page">
      <div className="bx--row repo-page__r1">
        <div className="bx--col-lg-16">
          <RepoQuery { ...queryProps } />
        </div>
      </div>
    </div>
  );
};

export default RepoPage;
