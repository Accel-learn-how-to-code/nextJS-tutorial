import Link from "next/link";
import { VehiclePerson } from "../../api/VehiclePerson";

export interface ListProps {
  ownersList?: VehiclePerson[];
}

export default function List({ ownersList }: ListProps) {
  return (
    <div>
      {ownersList?.map((e, index) => (
        <Link key={index} href={"/" + e.vehicle + "/" + e.ownerName}>
          <a>
            <div>
              {e.ownerName} has a {e.vehicle}. And {e.details}
            </div>
          </a>
        </Link>
      ))}
    </div>
  );
}
// export async function getStaticPaths() {
//   const response = await fetch("http://localhost:4001/vehicles");
//   const ownersList: VehiclePerson[] | undefined = await response.json();

//   const paths = ownersList?.map((item) => ({
//     params: { vehicle: item.vehicle, person: item.ownerName },
//   }))

//   return { paths, fallback: false }
// }

export async function getStaticProps() {
  const response = await fetch("http://localhost:4001/vehicles");
  const ownersList: VehiclePerson[] | undefined = await response.json();
  return { props: { ownersList } };
}
