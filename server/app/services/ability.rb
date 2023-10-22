class Ability
  include CanCan::Ability

  def initialize(current_user)
    allow_anonymous_actions

    current_user ||= User.new
    if current_user.superadmin?
      can :manage, Bookmark
    elsif current_user.user?
      can :read, Bookmark
    end
  end

  def allow_anonymous_actions
    can :create, User do |user|
      user.user?
    end
  end
end
