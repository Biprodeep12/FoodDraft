import Navbar from "@/components/navbar"
import { useMessages } from "@/Context/messagesContext"
import { useAuth } from "@/Context/userContext"
import { auth, db } from "@/firebase/firebase"
import { signOut, updateEmail, updateProfile } from "firebase/auth"
import { doc, getDoc } from "firebase/firestore"
import {
  User,
  Mail,
  Calendar,
  Clock,
  ScanLine,
  Save,
  X,
  Edit3,
  LogOut,
} from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { useEffect, useState } from "react"

export default function Profile() {
  const { user } = useAuth()
  const { setMessage, setMessageError } = useMessages()
  const [isEditing, setIsEditing] = useState(false)
  const [loading, setLoading] = useState(false)
  const [scannedNo, setScannedNo] = useState<number>(0);
  const [editForm, setEditForm] = useState({
    displayName: user?.displayName || "",
    email: user?.email || "",
    photoURL: user?.photoURL || "",
  })

  const handleSave = async () => {
  if (!user) return;

  try {
    const updateProfileData: { displayName?: string; photoURL?: string } = {};

    if (editForm.displayName !== user.displayName) {
      updateProfileData.displayName = editForm.displayName;
    }

    if (editForm.photoURL !== user.photoURL) {
      updateProfileData.photoURL = editForm.photoURL;
    }

    if (Object.keys(updateProfileData).length > 0) {
      await updateProfile(user, updateProfileData);
    }

    if (editForm.email !== user.email) {
      await updateEmail(user, editForm.email);
    }

    await user.reload();

    setMessageError(false);
    setMessage("Profile updated successfully!");
    setIsEditing(false);
  } catch (error) {
    setMessageError(true);
    setMessage("Error Updating Profile: " + error);
  }
  };

  const fetchScannedNo = async () => {
    if (!user?.uid) return 0;
    try {
      const scannedDocRef = doc(db, "users", user.uid, "scannedNo", "counter");
      const scannedDoc = await getDoc(scannedDocRef);

      if (scannedDoc.exists()) {
        const data = scannedDoc.data();
        return data.scannedNo || 0;
      } else {
        return 0;
      }
    } catch (error) {
      console.error("Error fetching scannedNo:", error);
      return 0;
    }
  };

  useEffect(()=>{
    setEditForm({
      displayName: user?.displayName || "",
      email: user?.email || "",
      photoURL: user?.photoURL || "",
    })
  },[isEditing])

  useEffect(()=>{
    if(user?.uid) {
      setLoading(false)
    }
  const getScanned = async () => {
    const no = await fetchScannedNo();
    setScannedNo(no);
  };

  getScanned();
  },[user])

  const clipDate = (dateString: string|undefined)=> {
    const date = new Date(dateString||'');
    const day = String(date.getDate()).padStart(2, '0');
    const month = date.toLocaleString('en-US', { month: 'short' });
    const year = date.getFullYear();
    return `${day} ${month} ${year}`;
  }

  const handleLogout = async () => {
    await signOut(auth);
    window.location.reload();
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex items-center justify-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-500"></div>
          </div>
        </div>
      </div>
    )
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="text-center py-20">
            <div className="w-16 h-16 bg-gray-100 rounded-full mx-auto flex items-center justify-center mb-4">
              <User className="h-8 w-8 text-gray-400" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-3">Please Sign In</h3>
            <p className="text-gray-600 mb-6">You need to be signed in to view your profile</p>
            <Link
              href="/auth"
              className="inline-flex items-center gap-2 bg-emerald-500 hover:bg-emerald-600 text-white px-6 py-3 rounded-xl font-medium transition-colors duration-200"
            >
              Sign In / Sign Up
            </Link>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="bg-gradient-to-br from-white to-emerald-50/30 rounded-3xl shadow-sm border border-gray-100 p-8 mb-8">
          <div className="flex flex-col md:flex-row items-center gap-8">
            <div className="relative group">
              <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-emerald-200 shadow-sm">
                {user.photoURL ? (
                  <Image
                    src={user.photoURL || "/placeholder.svg"}
                    alt={user.displayName || "User"}
                    width={128}
                    height={128}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full bg-emerald-100 flex items-center justify-center">
                    <User className="w-16 h-16 text-emerald-600" />
                  </div>
                )}
              </div>
            </div>

            <div className="flex-1 text-center md:text-left">
              <div className="flex flex-col md:flex-row md:items-center gap-4 mb-4">
                <h1 className="text-4xl font-bold text-gray-900">{user.displayName || "Anonymous User"}</h1>
                <button
                  onClick={() => setIsEditing(true)}
                  className="inline-flex cursor-pointer items-center gap-2 px-4 py-2 bg-emerald-50 hover:bg-emerald-100 text-emerald-600 rounded-xl font-medium transition-colors duration-200"
                >
                  <Edit3 className="w-4 h-4" />
                  Edit Profile
                </button>
              </div>

              <div className="flex flex-col sm:flex-row items-center justify-center md:justify-start gap-6 text-gray-600 mb-6">
                <div className="flex items-center gap-2">
                  <Mail className="w-5 h-5" />
                  <span>{user.email || "No email provided"}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="w-5 h-5" />
                  <span>Joined {clipDate(user.metadata.creationTime)}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-5 h-5" />
                  <span>Last active {clipDate(user.metadata.lastSignInTime)}</span>
                </div>
              </div>

              {user.emailVerified && (
                <div className="inline-flex items-center gap-2 px-3 py-1 bg-green-50 text-green-700 rounded-full text-sm font-medium">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  Verified Account
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-gradient-to-br from-white to-blue-50/30 rounded-2xl p-6 shadow-sm border border-gray-100">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-xl flex items-center justify-center shadow-sm">
                <ScanLine className="w-7 h-7 text-white" />
              </div>
              <div>
                <p className="text-3xl font-bold text-gray-900">{scannedNo}</p>
                <p className="text-gray-600 font-medium">Products Scanned</p>
              </div>
            </div>
          </div>
          <button onClick={handleLogout} className="bg-gradient-to-br from-white to-blue-50/30 cursor-pointer hover:bg-red-300 transition-colors duration-200 rounded-2xl p-6 shadow-sm border border-gray-100 flex flex-row items-center gap-5">
                <LogOut className="w-9 h-9 text-red-500" />
                <div className="text-3xl font-bold text-gray-900">Logout</div>
          </button>
        </div>

        {isEditing && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-8 max-w-md w-full">
              <div className="flex items-center justify-between mb-6">
                <div className="text-2xl font-bold text-gray-900">Edit Profile</div>
                <button
                  onClick={()=>setIsEditing(false)}
                  className="p-2 cursor-pointer hover:bg-gray-100 rounded-xl transition-colors duration-200"
                >
                  <X className="w-6 h-6 text-gray-500" />
                </button>
              </div>

              <div className="space-y-6">
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Display Name</label>
                    <input
                      type="text"
                      value={editForm.displayName}
                      onChange={(e) => setEditForm({ ...editForm, displayName: e.target.value })}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all duration-200"
                      placeholder="Enter your display name"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
                    <input
                      type="email"
                      value={editForm.email}
                      onChange={(e) => setEditForm({ ...editForm, email: e.target.value })}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all duration-200"
                      placeholder="Enter your email address"
                    />
                  </div>
                </div>

                <div className="flex gap-3 pt-4">
                  <button
                    onClick={()=>setIsEditing(false)}
                    className="flex-1 px-6 py-3 border cursor-pointer border-gray-300 text-gray-700 rounded-xl font-medium hover:bg-gray-50 transition-colors duration-200"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleSave}
                    className="flex-1 px-6 py-3 cursor-pointer bg-emerald-500 hover:bg-emerald-600 text-white rounded-xl font-medium transition-colors duration-200 flex items-center justify-center gap-2"
                  >
                    <Save className="w-4 h-4" />
                    Save Changes
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
