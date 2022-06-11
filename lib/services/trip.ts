import { DocumentData, DocumentReference, increment } from "firebase/firestore";
import {
  addMyTrip,
  addMyTripItem,
  addMyTripItemDetail,
  deleteMyTripItemDetail,
  updateMyTrip,
  updateMyTripItem,
} from "lib/apis/trip";
import { ITripItemDetailInfo } from "modules/slices/myTripItemSlice";
import { ITripInfo } from "modules/slices/tripCreationSlice";
export const createTrip = async ({
  uid,
  tripInfo,
}: {
  uid: string;
  tripInfo: ITripInfo;
}) => {
  try {
    const docRef = (await addMyTrip({
      uid,
      tripInfo,
    })) as DocumentReference<DocumentData>;
    await addMyTripItem({
      uid,
      tid: docRef.id,
      itemInfo: { title: "숙소", cost: 0 },
    });
    await addMyTripItem({
      uid,
      tid: docRef.id,
      itemInfo: { title: "항공", cost: 0 },
    });
    return {};
  } catch (error) {}
};
export const createTripItemDetail = async ({
  uid,
  tid,
  itemId,
  itemDetailInfo,
}: {
  uid: string;
  tid: string;
  itemId: string;
  itemDetailInfo: ITripItemDetailInfo;
}) => {
  try {
    await addMyTripItemDetail({ uid, tid, itemId, itemDetailInfo });
    await updateMyTrip({
      uid,
      tid,
      updateInfo: { cost: increment(itemDetailInfo.cost) },
    });
    await updateMyTripItem({
      uid,
      tid,
      itemId,
      updateInfo: { cost: increment(itemDetailInfo.cost) },
    });
    return {};
  } catch (error) {}
};

export const deleteTripItemDetail = async ({
  uid,
  tid,
  itemId,
  itemDetailId,
  cost,
}: {
  uid: string;
  tid: string;
  itemId: string;
  itemDetailId: string;
  cost: number;
}) => {
  try {
    await deleteMyTripItemDetail({
      uid,
      tid,
      itemId,
      itemDetailId,
    });
    await updateMyTrip({
      uid,
      tid,
      updateInfo: { cost: increment(-cost) },
    });
    await updateMyTripItem({
      uid,
      tid,
      itemId,
      updateInfo: { cost: increment(-cost) },
    });
    return {};
  } catch (error) {}
};
