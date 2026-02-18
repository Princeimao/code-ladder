export const searchUser = async (userId: string): Promise<{success: boolean, error: any, message: string}> => {
    try {
        // call database and search for the user and also return the user.
        return {
            success: true, 
            error: null, 
            message: "User found"
        }
    } catch (error) {
        console.log(error);
        return {
            success: false,
            error: error,
            message: "Internal server error"
        }
    }
}