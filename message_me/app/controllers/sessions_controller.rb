class SessionsController < ApplicationController
    def index
    end

    def create
        user = User.find_by(username: params[:session][:username])

        if user && user.authenticate(params[:session][:password])
            session[:user_id] = user.id
            flash[:success] = "You have successfully logged in"
            redirect_to root_path
        else
            flash.now[:error] = "Your credentials do not match our records"
            render 'new'
        end
    end

    def destroy
        session[:user_id] = null
        flash[:success] = "You have successfully logged out!"
        redirect_to login_path
    end
end
