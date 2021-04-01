import { NextPageContext } from "next";
import { useRouter } from "next/router";
import { VehiclePerson } from "../../../api/VehiclePerson";

export interface PersonProps {
  ownersList?: VehiclePerson[];
}

interface VehiclePersonContext extends NextPageContext {
  query: {
    person: string;
    vehicle: string;
  };
}
export default function Person({ ownersList }: PersonProps) {
  return <div>{ownersList?.[0].details}</div>;
}

// export async function getStaticPaths() {
//   const router = useRouter();
//   const { query } = router;
//   console.log(query)
//   const response = await fetch(
//     "http://localhost:4001/vehicles?ownerName=" +
//       query.person +
//       "&vehicle=" +
//       query.vehicle
//   );
//   const ownersList: VehiclePerson[] | undefined = await response.json();
//   const paths = {
//     vehicle: ownersList?.[0].vehicle,
//     person: ownersList?.[0].ownerName,
//   };
//   console.log(paths)
//   return { paths, fallback: false };
// }

export async function getServerSideProps({ query }: VehiclePersonContext) {
  const response = await fetch(
    "http://localhost:4001/vehicles?ownerName=" +
      query.person +
      "&vehicle=" +
      query.vehicle
  );
  const ownersList: VehiclePerson[] | undefined = await response.json();
  return { props: { ownersList } };
}

// Person.getInitialProps = async ({ query }: VehiclePersonContext) => {
//   const response = await fetch(
//     "http://localhost:4001/vehicles?ownerName=" +
//       query.person +
//       "&vehicle=" +
//       query.vehicle
//   );
//   const ownersList: VehiclePerson[] | undefined = await response.json();
//   return { ownersList };
// };
