import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  DocumentData,
  DocumentReference,
  getDoc,
  getDocs,
  updateDoc,
} from "firebase/firestore";
import {
  ITripItemDetailInfo,
  ITripItemInfo,
} from "modules/slices/myTripItemSlice";
import { ITripInfo } from "modules/slices/tripCreationSlice";
import { db } from "utils/firebase/app";
import { jsonConverter } from "utils/function";

export const addMyTrip = async ({
  uid,
  tripInfo,
}: {
  uid: string;
  tripInfo: ITripInfo;
}) => {
  try {
    const ref = await addDoc(collection(db, "Trip", uid, "myTripInfo"), {
      ...tripInfo,
    });
    return ref as DocumentReference<DocumentData>;
  } catch (error) {
    console.error(error);
  }
};

export const addMyTripItem = async ({
  uid,
  tid,
  itemInfo,
}: {
  uid: string;
  tid: string;
  itemInfo: ITripItemInfo;
}) => {
  try {
    const ref = await addDoc(
      collection(db, "Trip", uid, "myTripInfo", tid, "tripItems"),
      { ...itemInfo }
    );
    return ref as DocumentReference<DocumentData>;
  } catch (error) {
    console.error(error);
  }
};

export const addMyTripItemDetail = async ({
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
    const ref = await addDoc(
      collection(
        db,
        "Trip",
        uid,
        "myTripInfo",
        tid,
        "tripItems",
        itemId,
        "detail"
      ),
      {
        ...itemDetailInfo,
      }
    );
    return ref as DocumentReference<DocumentData>;
  } catch (error) {
    console.error(error);
  }
};
export const updateMyTrip = async ({
  uid,
  tid,
  updateInfo,
}: {
  uid: string;
  tid: string;
  updateInfo: any;
}) => {
  try {
    const ref = doc(db, "Trip", uid, "myTripInfo", tid);
    const res = await updateDoc(ref, { ...updateInfo });
    return res as void;
  } catch (error) {
    console.error(error);
  }
};
export const updateMyTripItem = async ({
  uid,
  tid,
  itemId,
  updateInfo,
}: {
  uid: string;
  tid: string;
  itemId: string;
  updateInfo: any;
}) => {
  try {
    const ref = doc(db, "Trip", uid, "myTripInfo", tid, "tripItems", itemId);
    const res = await updateDoc(ref, { ...updateInfo });
    return res as void;
  } catch (error) {
    console.error(error);
  }
};

export const deleteMyTripItemDetail = async ({
  uid,
  tid,
  itemId,
  itemDetailId,
}: {
  uid: string;
  tid: string;
  itemId: string;
  itemDetailId: string;
}) => {
  try {
    const ref = doc(
      db,
      "Trip",
      uid,
      "myTripInfo",
      tid,
      "tripItems",
      itemId,
      "detail",
      itemDetailId
    );
    const res = await deleteDoc(ref);
    return res as void;
  } catch (error) {
    console.error(error);
  }
};

export const getMyTrip = async ({ uid, tid }: { uid: string; tid: string }) => {
  try {
    const ref = await getDoc(doc(db, "Trip", uid, "myTripInfo", tid));
    return { data: jsonConverter(ref.data()) };
  } catch (error) {
    console.error(error);
  }
};

export const getMyTripItem = async ({
  uid,
  tid,
  itemId,
}: {
  uid: string;
  tid: string;
  itemId: string;
}) => {
  try {
    const ref = await getDoc(
      doc(db, "Trip", uid, "myTripInfo", tid, "tripItems", itemId)
    );
    return {
      data: jsonConverter(ref.data()),
    };
  } catch (error) {
    console.error(error);
  }
};
export const getMyTripItemList = async ({
  uid,
  tid,
}: {
  uid: string;
  tid: string;
}) => {
  try {
    const ref = await getDocs(
      collection(db, "Trip", uid, "myTripInfo", tid, "tripItems")
    );
    return {
      data: JSON.parse(
        JSON.stringify(ref.docs.map((doc) => ({ id: doc.id, ...doc.data() })))
      ),
    };
  } catch (error) {
    console.error(error);
  }
};

export const getMyTripItemDetailList = async ({
  uid,
  tid,
  itemId,
}: {
  uid: string;
  tid: string;
  itemId: string;
}) => {
  try {
    const ref = await getDocs(
      collection(
        db,
        "Trip",
        uid,
        "myTripInfo",
        tid,
        "tripItems",
        itemId,
        "detail"
      )
    );
    return {
      data: JSON.parse(
        JSON.stringify(ref.docs.map((doc) => ({ id: doc.id, ...doc.data() })))
      ),
    };
  } catch (error) {
    console.error(error);
  }
};

export const getMyTripList = async ({ uid }: { uid: string }) => {
  try {
    const ref = await getDocs(collection(db, "Trip", uid, "myTripInfo"));
    return {
      data: jsonConverter(
        ref.docs.map((doc) => ({ id: doc.id, ...doc.data() }))
      ),
    };
  } catch (error) {
    console.error(error);
  }
};
